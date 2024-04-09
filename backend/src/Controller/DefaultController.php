<?php
// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController
{
    #[Route('/hello/{name}', methods: ['GET'])]
    public function index(string $name)
    {
        return new Response("Hello, $name!");
    }
}