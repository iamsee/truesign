<?php
/**
 * Created by PhpStorm.
 * User: ql-win
 * Date: 2017/3/10
 * Time: 13:20
 */
class appsController extends  oAppBaseController
{
    public function getAppRuleAction(){
        $apprule = new \Royal\Data\DAO(new \Truesign\Adapter\Apps\appRuleAdapter());
        $rules = $apprule->readSpecified(array(),array());
        $this->output2json($rules);
    }

    public function indexAction(){
        $call = $_GET['callback'];
        $data = array(
            'name'=>'index',
            'token'=>'12345',
        );
        $this->setBody($data);
    }
    public function index2Action(){
        $call = $_GET['callback'];
        $data = array(
            'name'=>'index2',
            'token'=>'12123123',
        );
        $this->setBody($data);
    }
    public function index3Action(){
        $call = $_GET['callback'];
        $data = array(
            'name'=>'index3qqqq',
            'token'=>'aa',
        );
        $this->setBody($data);
        return false;
    }
    public function index4Action(){
        $call = $_GET['callback'];
        $data = array(
            'name'=>'index4',
            'token'=>'aaabb',
        );
        $this->setBody($data);
    }



}