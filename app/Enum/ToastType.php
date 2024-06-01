<?php

namespace App\Enum;

enum ToastType: string
{
    case Success = 'success';
    case Danger = 'danger';
    case Info = 'info';
    case Warning = 'warning';
}
