<?php

namespace App\Table;

use Illuminate\Contracts\Support\Arrayable;

class Column implements Arrayable
{
    public function __construct(
        public readonly string $key,
        public readonly string $label,
        public readonly bool $canBeHidden = true,
        public bool $hidden = false,
        public readonly bool $sortable = false,
        public bool|string $sorted = false,
        public ?int $sortNumber = null
    ) {
    }

    /**
     * Convert the Column object to an array.
     *
     * @return array The converted array representation of the Column object.
     */
    public function toArray(): array
    {
        return [
            'key' => $this->key,
            'label' => $this->label,
            'can_be_hidden' => $this->canBeHidden,
            'hidden' => $this->hidden,
            'sortable' => $this->sortable,
            'sorted' => $this->sorted,
            'sort_number' => $this->sortNumber,
        ];
    }
}
