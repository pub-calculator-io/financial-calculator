<?php
/*
Plugin Name: CI Financial calculator
Plugin URI: https://www.calculator.io/financial-calculator/
Description: You can use free financial calculators online to estimate your investments’ future value (FV), compounding periods (N), interest rate (I/Y), periodic payment (PMT), and present value (PV).
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_financial_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Financial Calculator by Calculator.iO";

function display_ci_financial_calculator(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">Financial Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_financial_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_financial_calculator', 'display_ci_financial_calculator' );