const ApiRootUrl = 'http://182.92.230.1:9051/api/'; // 测试: http://182.92.230.1:9051  生产: https://appgateway.ypt.jaya.cc

module.exports = {
  ApiRootUrl,
  ImagOrigin: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
  LoginConfig: {
    "client_id": "mp_student",
    "client_secret": "28896c9426dc48f3b8f55b07dd833983",
    "grant_type": "password",
    "scope": "server"
  }, //微信登录配置信息
  AuthLoginByWeixin: ApiRootUrl + 'auth/oauth/wx/token', //微信登录
  NeedPhone: ApiRootUrl + 'auth/oauth/wx/need/phone', //微信登录
  BindReferrer: ApiRootUrl + 'mp/student/student/recommend', //绑定推荐人
  QueryReferrer: ApiRootUrl + 'mp/student/coach/recommend/query', //查询推荐人
  StudentDuration: ApiRootUrl + 'mp/student/statistic/train/length', //学员训练时长统计
  StudentDeduct: ApiRootUrl + 'mp/student/statistic/deduct', //学员扣分项目统计
  StudentPass: ApiRootUrl + 'mp/student/statistic/exam/pass', //学员模考通过率统计
  StudentExamDeduct: ApiRootUrl + 'mp/student/statistic/exam/deduct', //学员模考扣分统计
  StudyGet: ApiRootUrl + 'mp/student/study/getAdvertising', //学习广告获取
  StudyProjectVideo: ApiRootUrl + 'mp/student/study/getSubProjectVideo', //学习首页视频列表
  StudyCarTypeTab: ApiRootUrl + 'mp/student/study/getComponentCarType', //部件学习车型
  StudyCarTypeList: ApiRootUrl + 'mp/student/study/getComponentList', //部件学习列表
  StudyLightList: ApiRootUrl + 'mp/student/study/getLightList', //灯光讲解列表
  StudyCarLightList: ApiRootUrl + 'mp/student/study/getLightCarType', //灯光讲解列表
  ShareFinish: ApiRootUrl + 'mp/student/train-record/finish', //分享介绍训练
  MyCoach: ApiRootUrl + 'mp/student/coach/my/coach', //我的教练
  evaluate: ApiRootUrl + 'mp/student/coach/evaluate', //提交评价
  OrderPage: ApiRootUrl + 'mp/student/orders/page', //订单列表
  OrderInfo: ApiRootUrl + 'mp/student/orders/info', //订单详情
  OrderUseMsg: ApiRootUrl + 'mp/student/orders/use/record', //订单使用记录
  ProjectDetail: ApiRootUrl + 'mp/student/study/getSubProjectDetail', //项目视频详细
  StudentInfo: ApiRootUrl + 'mp/student/student/my/info', //设置获取学员信息
  StudentNickName: ApiRootUrl + 'mp/student/student/updateNickName', //修改昵称
  StudentGender: ApiRootUrl + 'mp/student/student/updateGender', //修改性别
  StudentGetCode: ApiRootUrl + 'mp/student/student/verifyPhone', //获取验证码
  StudentVerifyCode: ApiRootUrl + 'mp/student/student/verifyCode', //校验验证码
  StudentUpdatePhone: ApiRootUrl + 'mp/student/student/updatePhone', //修改手机号
  RealName: ApiRootUrl + 'mp/student/student/attest/real-name', //真是姓名
  SchoolList: ApiRootUrl + 'mp/student/drvSchool/school/list', //获取驾校
  SelectCity: ApiRootUrl + 'mp/student/drvSchool/city/select', //获取城市
  SchoolRegister: ApiRootUrl + 'mp/student/drvSchool/student/register', //认证驾校
  DrvSchoolInfo: ApiRootUrl + 'mp/student/drvSchool/info', //获取某驾校信息
  ReserveStudentPage: ApiRootUrl + 'mp/student/reserveStudent/page', // 预约列表
  ReserveStudentAdd: ApiRootUrl + 'mp/student/reserveStudent/add', // 新增预约
  ReserveStudentCancelUpdate: ApiRootUrl + 'mp/student/reserveStudent/cancelUpdate', // 取消预约
  pageSysApi: ApiRootUrl + 'mp/student/Message/pageSys', // 系统消息
  pageActivityApi: ApiRootUrl + 'mp/student/Message/pageActivity', // 活动消息
  QueryRecommend: ApiRootUrl + 'mp/student/coach/recommend/query', // 查询推荐人
  BindRecommend: ApiRootUrl + 'mp/student/student/recommend', // 绑定推荐人
  ScanCodeDriver: ApiRootUrl + 'mp/student/equipment/scanCode', // 学员扫码设备
  GetSetmeal: ApiRootUrl + 'mp/student/mpOperationManage/list', // 学生--获取套餐信息
  IsAuthAudit: ApiRootUrl + 'mp/student/student/name-auth-audit-status', // 学生--是否实认证
  TrainRecord: ApiRootUrl + 'mp/student/train-record/list/', // 训练记录
  // TrainRecordInfo: ApiRootUrl + 'mp/student/train-record/info', // 训练详情
  TrainRecordInfoType: ApiRootUrl + 'mp/student/train-record/info/type', // 训练详情-训练类型列表
  //TrainRecordProject: ApiRootUrl + 'mp/student/train-record/info/project', // 训练详情-训练项目列表
  TrainRecordFinish: ApiRootUrl + 'mp/student/train-record/finish', // 结束训练
  TrainRecordGps: ApiRootUrl + 'mp/student/train-record/gps/track', // 获取GPS轨迹
  EquipmentUsed: ApiRootUrl + 'mp/student/equipment/used', // 设备使用中查询
  ToPay: ApiRootUrl + 'mp/student/payment/wx/prepay', // 微信生成预支付交易单
  ShowCount: ApiRootUrl + 'mp/student/subprojectexplain/add/show-count', // 统计播放次数
  ExamCount: ApiRootUrl + 'mp/student/statistic/exam/count', //首页——科二、科三训练统计
  RefreshToken: ApiRootUrl + 'auth/oauth/wx/refresh/token', //微信刷新token
  ReserveDate: ApiRootUrl + 'mp/student/reserveStudent/reserve-date', //预约日期约满情况
  ReserveStudentYxtAdd: ApiRootUrl + 'mp/student/reserveStudent/yxt/add', //新增易学通预约
  FindCarType: ApiRootUrl + 'mp/student/yxt/standardChargeConfig/findCarType', //查询车型配置
  ReserveStudent: ApiRootUrl + 'mp/student/reserveStudent/today/reserve', //查询当日预约单
  YxtDetail: ApiRootUrl + 'mp/student/orders/yxt/detail', //查询当日预约单
  StandardCharge: ApiRootUrl + 'mp/student/yxt/standardChargeConfig/info', //查询收费标准设置
  DiscountRule: ApiRootUrl + 'mp/student/yxt/discountRule/order/rule/applets', //查询订单优惠规则
  YxtPrePay: ApiRootUrl + 'mp/student/payment/yxt/prepay', //易学通根据预约下单
  YxtCarInfo: ApiRootUrl + 'mp/student/yxt/info', //易学通车辆管理管理
  ReserveTime: ApiRootUrl + 'mp/student/reserveStudent/reserve-time', //易学通根据预约下单
  CanList: ApiRootUrl + 'mp/student/reserveStudent/yxt/can/list', //易学通时间约满情况
  PaymentRepay: ApiRootUrl + 'mp/student/payment/repay', //易学通重新支付
  OrdersCancel: ApiRootUrl + 'mp/student/orders/cancel', //易学通重新支付
  ProjectSimple: ApiRootUrl + 'mp/student/train-record/info/project/simple', //训练详情-训练项目列表
  TrainRecordInfo: ApiRootUrl + 'mp/student/train-record/info', //训练详情
  TrainRecordGPS: ApiRootUrl + 'mp/student/train-record/gps/track', //获取GPS轨迹（根据错误ID）
  TopDrvSchoolById: ApiRootUrl + 'mp/student/yxt/findTopDrvSchoolById', //根据设备id查询主校id
  ActiveOrder: ApiRootUrl + 'mp/student/orders/active', //订单激活
  FindJxtCarType: ApiRootUrl + 'mp/student/jxtStandardChargeConfig/findCarType', //简学通查车型
  JxtoperateList: ApiRootUrl + 'mp/student/yxt/operate/list', //简学通查车
  ReserveJxtDate: ApiRootUrl + 'mp/student/reserveStudent/jxt/reserve-date', //简学查预约日期
  ReserveJxtTime: ApiRootUrl + 'mp/student/reserveStudent/jxt/reserve-time', //简学查预约时间
  ReserveStudentJxtAdd: ApiRootUrl + 'mp/student/reserveStudent/jxt/add', //简学通新增预约
  CoachSimpleList: ApiRootUrl + 'mp/student/coach/simpleList' //简学通新增预约
}