<?php

namespace App\Table;

use Illuminate\Contracts\Support\Arrayable;

class SearchInput implements Arrayable
{
    public function __construct(
        public readonly string $key,
        public readonly string $label,
        public ?string $value = null,
        public bool $shown = false
    ) {
    }

    public function toArray(): array
    {
        return [
            'key' => $this->key,
            'label' => $this->label,
            'value' => $this->value,
            'shown' => $this->shown,
        ];
    }
}
