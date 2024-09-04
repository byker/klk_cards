<!-- resources/views/welcome.blade.php -->
<!DOCTYPE html>
<html>

<head>
    <title>{{ env('APP_NAME') }}</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>

<body>
    <div id="app">
        <!-- Your Vue components will be rendered here -->
    </div>
    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>
