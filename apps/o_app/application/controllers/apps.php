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
        $rules = $apprule->readSpecified(array(),array('id','appname','applevel'));
        $this->setResponseBody($rules);
    }

    public function bindappsAction(){
        $params = $this->getParams(array('apps','key','pass','unique_auth_code'),array());
        $doDao = new \Royal\Data\DAO(new \Truesign\Adapter\Apps\appCtrlLevelAdapter());
        $db_response = $doDao->readSpecified(
            array('`key`'=>$params['key'],'`pass`'=>$params['pass']),
            array('document_id','nickname')
        );
        $preParams = [];

        $this->setResponseBody($db_response['data']);
    }
    public function index2Action(){
        $call = $_GET['callback'];
        $data = array(
            'name'=>'index2',
            'token'=>'12123123',
        );
        $this->setResponseBody($data);
    }
    public function index3Action(){
        $call = $_GET['callback'];
        $data = array(
            'name'=>'index3qqqq',
            'token'=>'aa',
        );
        $this->setResponseBody($data);
        return false;
    }
    public function index4Action(){
        $call = $_GET['callback'];
        $data = array(
            'name'=>'index4',
            'token'=>'aaabb',
        );
        $this->setResponseBody($data);
    }



}