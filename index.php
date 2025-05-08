<?php

/**
 * Plugin Name: Test Plugin
 * Plugin URI:
 * Description:
 * Author: Andrius Solopovas
 * Author URI:
 * Version: 1.0.0
 * License: Unlicensed
 * License URI: Unlicensed
 *
 */

use Illuminate\Support\Facades\Vite;
//  Bootstrap
if (!defined('ABSPATH')) exit;
require_once __DIR__ . "/vendor/autoload.php";

$env_file = __DIR__ . '/.env';
if (!file_exists($env_file)) {
    file_put_contents($env_file, "TEST_ENV=production");
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

add_filter('admin_head', function () {

    if (! get_current_screen()?->is_block_editor()) {
        return;
    }
    $hotFilePath = __DIR__ . '/public/hot';

    Vite::useBuildDirectory('../../../plugins/test-plugin/public/build');

    if (file_exists($hotFilePath)) {
        Vite::useHotFile($hotFilePath);
    }

    if (Vite::isRunningHot()) {
        echo Vite::reactRefresh();
    }

    $dependencies = json_decode(Vite::content('editor.deps.json'));
    foreach ($dependencies as $dependency) {
        if (! wp_script_is($dependency, 'enqueued')) {
            wp_enqueue_script($dependency);
        }
    }

    $html = Vite::withEntryPoints([
        'src/index.tsx',
    ])->toHtml();

    if (!file_exists($hotFilePath)) {
        $html = str_replace('/themes/test-theme/public/build', '', $html);
    }
    echo $html;
});
