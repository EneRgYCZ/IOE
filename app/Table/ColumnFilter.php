<?php

namespace App\Table;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Builder;

class ColumnFilter implements Arrayable
{
    public readonly string $key;
    public readonly array $options;
    public ?array $value = [];

    public function __construct(
        Column $column,
        Builder $tableQuery
    ) {
        $this->key = $column->key;

        $columnValues = $tableQuery->pluck($column->key);
        $this->options = $columnValues->toArray();
    }

    public function toArray(): array
    {
        return [
            'key' => $this->key,
            'options' => $this->options,
            'value' => $this->value,
        ];
    }
}
