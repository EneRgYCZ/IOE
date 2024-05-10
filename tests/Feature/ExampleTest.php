<?php

it('returns a successful response', function () {
    $response = $this->get('/employees');

    $response->assertStatus(200);
});
