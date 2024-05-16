<?php

namespace App\Table;

use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Inertia\Response;

class Table
{
    private string $name = 'default';

    private string $pageName = 'page';

    private string $defaultSort = '';

    private array $perPageOptions = [15, 30, 50, 100];

    private Collection $columns;

    private Collection $searchInputs;

    private static array $defaultQueryBuilderConfig = [];

    public const DEFAULT_PER_PAGE = 15;

    public function __construct(private readonly Request $request)
    {
        $this->columns = collect();
        $this->searchInputs = collect();
    }

    private function query(string $key, array|string|null $default = null): array|string|null
    {
        return $this->request->query(
            $this->name === 'default' ? $key : "{$this->name}_{$key}",
            $default
        );
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setPageName(string $pageName): self
    {
        $this->pageName = $pageName;

        return $this;
    }

    public function setDefaultSort(string $defaultSort): self
    {
        $this->defaultSort = $defaultSort;

        return $this;
    }

    public function setPerPageOptions(array $perPageOptions): self
    {
        $this->perPageOptions = $perPageOptions;

        return $this;
    }

    public function addColumn(Column $column): self
    {
        $this->columns = $this->columns->push($column)->values();

        return $this;
    }

    private function transformColumns(): Collection
    {
        $columns = $this->query('columns', []);
        $sort = $this->query('sort', $this->defaultSort);

        return $this->columns->map(function (Column $column) use ($columns, $sort) {
            $key = $column->key;

            if (! empty($columns)) {
                $column->hidden = ! in_array($key, $columns, true);
            }

            foreach (explode(',', $sort) as $no => $value) {
                if ($value === $key) {
                    $column->sorted = 'asc';
                    $column->sortNumber = $no;
                } elseif ($value === "-{$key}") {
                    $column->sorted = 'desc';
                    $column->sortNumber = $no;
                }
            }

            return $column;
        });
    }

    public function addSearchInput($searchInput): self
    {
        if ($searchInput instanceof SearchInput) {
            $this->searchInputs = $this->searchInputs->push($searchInput)->values();
        } else {
            throw new \InvalidArgumentException('Invalid input type');
        }

        return $this;
    }

    private function transformSearchInputs(): Collection
    {
        $filters = $this->query('filter', []);

        if (empty($filters)) {
            return $this->searchInputs;
        }

        return $this->searchInputs->map(function (SearchInput $searchInput) use ($filters) {
            if (array_key_exists($searchInput->key, $filters)) {
                $searchInput->value = $filters[$searchInput->key];
            }

            return $searchInput;
        });
    }

    public function getQueryBuilder(): array
    {
        return [
            'columns' => $this->transformColumns(),

            'searchInputs' => $this->transformSearchInputs(),

            'sort' => $this->query('sort', $this->defaultSort) ?: null,
            'defaultSort' => $this->defaultSort,

            'cursor' => $this->query('cursor'),
            'page' => Paginator::resolveCurrentPage($this->pageName),
            'pageName' => $this->pageName,
            'perPageOptions' => $this->perPageOptions,
            'perPage' => (int) $this->query('perPage') ?: Arr::first($this->perPageOptions),
        ];
    }

    public function apply(Response $response): Response
    {
        $props = array_merge($response->getQueryBuilder(), [
            $this->name => $this->getQueryBuilder(),
        ]);

        return $response->with('queryBuilder', $props);
    }

    public static function updateQueryBuilderParameters(string $name): void
    {
        if (empty(static::$defaultQueryBuilderConfig)) {
            static::$defaultQueryBuilderConfig = config('query-builder.parameters');
        }

        $newConfig = collect(static::$defaultQueryBuilderConfig)->map(function ($value) use ($name) {
            return "{$name}_{$value}";
        })->all();

        config(['query-builder.parameters' => $newConfig]);
    }
}
