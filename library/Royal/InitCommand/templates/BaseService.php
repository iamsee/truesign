<?php

$str =  <<< TEMPLATE
<?php
/**
 * Created by PhpStorm.
 * User: liuwei
 * Date: 16/6/12
 * Time: 下午2:13
 */

namespace Truesign\Service\%s;




use Royal\Crypt\SHA256;
use Truesign\Service\AppBaseService;

class BaseService extends AppBaseService
{





    public function __construct()
    {

    }




}
TEMPLATE;
return $str;