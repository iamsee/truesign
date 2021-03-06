<?php
namespace Truesign\Adapter\Base;

use \Royal\Data\DAOAdapter;
use \Royal\Data\Field;

abstract class DbLibraryAdapter extends \Royal\Data\DAOAdapter
{

    protected $_id = '';

    protected $_isPrimissionEnabled = true;

    protected $_fixCompany = true;

    protected $_ignoreDeletedCondition = false;

    protected $_fieldConstruct = null;

    public function belongApp(){
        return 'null';
    }
    public function db_Prefix()
    {
        return null;
    }
    public function dbAccess(){
        return null;
    }
    public function database()
    {
        return 'db_library';
    }
    public function dbConfig(){
        return 'db_library';
    }

    public function dbDesc()
    {
        return '数据服务器信息库';
    }

    public function dbInit()
    {
        return null;
    }

    public function dbAdd()
    {
        return null;
    }

    public function dbModify()
    {
        return null;
    }

    public function dbDel()
    {
        return null;
    }

    public function tableInit()
    {
        return Field::start();
    }

//-------------
    public function paramRules()
    {
        $rules = $this->getStaticFieldConstruct()->getRule();
        $rules['update_time'] = array(
            'name'=>'update_time',
            'title'=>'更新时间',
            'able_modify'=>false,
        );
        $rules['create_time'] = array(
            'name'=>'create_time',
            'title'=>'创建时间',
            'able_modify'=>false,
        );
        return $rules;
    }
    public function getStaticFieldConstruct()
    {
        if (!$this->_fieldConstruct) {
            $this->_fieldConstruct = $this->tableInit();
        }
        return $this->_fieldConstruct;
    }
    public function paramsMapping()
    {
        return $this->getStaticFieldConstruct()->getMap();
    }
    public function keyConf()
    {
        return $this->getStaticFieldConstruct()->getKey();
    }




    

}
