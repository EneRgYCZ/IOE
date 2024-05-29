<?php

namespace App\Http\Controllers;

use App\Enum\ToastType;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function toast(
        string $title,
        ToastType $type,
        string $description = '',
        int $ms = 5000,
        ?array $action = null
    ): void {
        request()?->session()->flash('toast', self::buildToast($title, $type, $description, $ms, $action));
    }

    public static function buildToast(
        string $title,
        ToastType $type,
        string $description = '',
        int $ms = 5000,
        ?array $action = null
    ): array {
        return [
            'title' => $title,
            'description' => $description,
            'type' => $type,
            'timeout' => $ms,
            'action' => $action,
        ];
    }
}
