<?php

namespace App\Table;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Builder;

class ColumnFilter implements Arrayable
{
    public readonly string $key;

    public readonly array $options;

    public ?array $value = [];

    /**
     * Constructs a new ColumnFilter instance.
     *
     * The constructor initializes the ColumnFilter object with specific properties derived from the provided column and query.
     * It sets the filter key to the identifier of the column, and retrieves the available options for this filter
     * from the database using a query. This allows the filter to dynamically populate its options based on the current database contents.
     *
     * @param  Column  $column  The column instance from which the key is retrieved and used to fetch distinct values from the database.
     * @param  Builder  $tableQuery  The query builder instance used to execute database queries. It's specifically used here to
     *                               fetch the unique values of the column specified, which serve as the options for this filter.
     */
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
