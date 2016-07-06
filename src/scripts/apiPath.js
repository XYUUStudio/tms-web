var ApiPath = {
    TMSApi: {
        UP: {
            //登录
            pcLogin: AppConfig.TMSBasePath + "/account/pcLogin",
        },
        businessData: {
            //企业列表
            enterprisesList: AppConfig.TMSBasePath + "/businessData/enterprises/search",
            //企业详情
            enterprisesDetail: AppConfig.TMSBasePath + "/businessData/enterprises/detail",
            //新增
            enterprisesRegister: AppConfig.TMSBasePath + "/businessData/enterprises/register",
            //编辑
            enterprisesModify: AppConfig.TMSBasePath + "/businessData/enterprises/modify",
            //启用/禁用
            enterprisesEnableDisable: AppConfig.TMSBasePath + "/businessData/enterprises/enableDisable",
        },
        user: {
            //用户列表
            userList: AppConfig.TMSBasePath + "/user/search",
            //用户详情
            userDetail: AppConfig.TMSBasePath + "/user/detail",
            //重置密码
            userReset: AppConfig.TMSBasePath + "/user/resetPsw",
            //用户添加
            userAdd: AppConfig.TMSBasePath + "/user/add",
            //用户编辑
            userEdit: AppConfig.TMSBasePath + "/user/modify"
        },
    },
}
