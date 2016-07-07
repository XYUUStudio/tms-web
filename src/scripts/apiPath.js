var ApiPath = {
    TMSApi: {
        UP: {
            //登录
            pcLogin: AppConfig.TMSBasePath + "/account/pcLogin"
        },
        businessData: {
            //企业列表
            enterprisesList: AppConfig.TMSBasePath + "/businessData/enterprises/search",
            //企业详情
            enterprisesDetail: AppConfig.TMSBasePath + "/businessData/enterprises/detail",
            //新增
            enterprisesRegister: AppConfig.TMSBasePath + "/businessData/enterprises/add",
            //编辑
            enterprisesModify: AppConfig.TMSBasePath + "/businessData/enterprises/modify",
            //启用/禁用
            enterprisesEnableDisable: AppConfig.TMSBasePath + "/businessData/enterprises/enableDisable",
            //用户列表
            userList: AppConfig.TMSBasePath + "/user/search",
            //用户详情
            userDetail: AppConfig.TMSBasePath + "/user/detail",
            //重置密码
            userReset: AppConfig.TMSBasePath + "/user/resetPsw",
            //用户添加
            userAdd: AppConfig.TMSBasePath + "/user/add",
            //用户编辑
            userEdit: AppConfig.TMSBasePath + "/user/modify",
            //用户角色
            userRole: AppConfig.TMSBasePath + "/common/searchRole"
        },
        dispatchingManagement: {
            //调度管理接口
            searchDispatchingList: AppConfig.TMSBasePath + "/consignment/search",
            //派单
            dispatch: AppConfig.TMSBasePath + "/consignment/dispatch"
        },
        dictionary: {
            //公共字典
            //省市区
            admDivisionInfoSearch: AppConfig.TMSBasePath + "/systemData/dictionary/admDivisionInfoSearch",
            //图片上传
            upload: AppConfig.TMSBasePath + "/upload/basedata",
            //司机
            getPickupDriverList: AppConfig.TMSBasePath + "/user/search",
        },
        orderSearch: AppConfig.TMSBasePath + "/dispatchingManagement/search",
    }
}
