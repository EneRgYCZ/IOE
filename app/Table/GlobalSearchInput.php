<?php

namespace App\Table;

use Illuminate\Contracts\Support\Arrayable;

class GlobalSearchInput implements Arrayable
{
    public function __construct(
        public readonly array $searchColumns,
        public readonly string $label,
        public ?string $value = null
    ) {
    }

    public function toArray(): array
    {
        return [
            'search_columns' => $this->searchColumns,
            'label' => $this->label,
            'value' => $this->value,
        ];
    }
}
