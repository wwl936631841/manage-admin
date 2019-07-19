<template>
    <div id="processDetail">
        <div class="title">
            <span>流程实例</span>
            <p>流程实例详情</p>
            <span class="back" @click="back">
                <!-- <i class="el-icon-back"></i> -->
                返回 >
            </span>
        </div>
        <div class="center">
            <div class="top">
                <div class="left">
                    <img :src="imgUrl"  @click="open" alt="">
                </div>
                <div class="right">
                    <p>流程启动参数</p>
                    <div class="msg" v-if="paramsList!=null&&paramsList.bizVariable.params">
                        <div class="rule">
                            <div class="left1">催缴模板</div>
                            <div class="right1">{{paramsList.bizVariable.params.name}}</div>
                        </div>
                        <div class="rule">
                            <div class="left1">欠费时长</div>
                            <div class="right1">欠费{{ paramsList.bizVariable.params.durationRule }}个月起开始催缴</div>
                        </div>
                        <div class="rule">
                            <div class="left1">催缴周期</div>
                            <div class="right1">{{ paramsList.bizVariable.params.periodRule }}个月</div>
                        </div>
                        <div class="rule">
                            <div class="left1">短信催缴</div>
                            <div class="right1">欠费{{ paramsList.bizVariable.params.noteRule }}个月起开启短信自动发送催缴</div>
                        </div>
                        <div class="rule">
                            <div class="left1">电话催缴</div>
                            <div class="right1">欠费{{ paramsList.bizVariable.params.telRule }}个月起开启电话催缴</div>
                        </div>
                        <div class="rule">
                            <div class="left1">上门催缴</div>
                            <div class="right1">欠费{{ paramsList.bizVariable.params.visitRule }}个月起开启上门催缴</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="state">
                    <div class="options">
                        <div class="select">
                            <p>获取分析数据</p>
                            <el-select v-model="value" 
                            clearable
                            @change="changeOption" 
                            placeholder="全部">
                                <!-- <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option> -->
                                <el-option
                                v-for="(item,index) in options" :key="index"
                                :value="item.processNode"
                                :label="item.processNodeName">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="status">
                            <div>
                                <span>节点状态:</span>
                                <span v-if="itemArr!=null && itemArr.xxlParams">
                                    <span v-if="itemArr.xxlParams.handleCode==1 || itemArr.xxlParams.handleCode==200 ">正常</span>
                                    <span v-if="itemArr.xxlParams.handleCode==500" ></span>
                                </span>
                            </div>
                            <span style="color:red" v-show="this.val">{{ title }}</span>
                            
                        </div>
                    </div>
                    <div class="toggleState">
                        <p>调度参数</p>
                        <div class="state1">
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                <span>执行器地址:</span>{{itemArr.xxlParams.executorAddress}}
                            </div>
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                <span>jobHandle:</span>{{itemArr.xxlParams.executorHandler}}
                            </div>
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                <span>任务参数:</span>{{itemArr.xxlParams.executorParam}}
                            </div>
                        </div>
                        <p>
                            调度结果日志
                            <span v-if="itemArr!=null && itemArr.xxlParams">
                                <span style="color:green" v-if="itemArr.xxlParams.handleCode==1 || itemArr.xxlParams.handleCode==200 ">(成功)</span>
                                <span style="color:red" v-if="itemArr.xxlParams.handleCode!=1">(失败)</span>
                            </span>
                        </p>
                        <div class="state2">
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                {{itemArr.xxlParams.handleMsg}}
                            </div>
                        </div>
                        <p>执行日志</p>
                        <div class="state3">
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                ---------- xxl-job job execute strat ----------
                            </div>
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                ---------- <span>param:</span>{{itemArr.xxlParams.executorParam}}
                            </div>
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                {{itemArr.xxlParams.handleTime | dateFormat }}
                            </div>
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                ---------- xxl-job job execute end(finish) ----------
                            </div>
                            <div v-if="itemArr!=null && itemArr.xxlParams">
                                ---------- <span>ReturnT:</span>ReturnT [ code={{itemArr.xxlParams.handleCode}} , msg={ {{itemArr.xxlParams.handleMsg}} } ]
                            </div>
                        </div>
                    </div>
                </div>
                <div class="node">
                    <p>流程启动参数</p>
                    <!-- <div v-if="itemArr!=null && itemArr.xxlParams">
                        {{itemArr.activitiParams}}
                    </div> -->
                    <div>
                        <!-- {{itemArr.activitiParams}} -->
                        {{ paramsList }}
                    </div>
                </div>
            </div>
        </div>
        <el-dialog class="pics" title="查看图片" :visible.sync="dialogTableVisible">
            <img :src="imgUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { getOption , getOptionState } from '../../../unfetch/api.js'
import { baseUrl } from '../../config/env.js'
export default {
    name:"processDetail",
    props: {
        
    },
    data(){
        return{
            dialogTableVisible:false,
            type:"",
            activeName: 'second',
            options:[],
            value:'',
            paramsList:{},
            imgUrl:'',
            itemArr:{},
            err:{},
            val:false,
            title:''
        }
    },
    created(){
        this.getpage()
        
    },
    mounted() {
        
    },
    watch: {
        '$route':'getpage',
    },
    methods: {
        open(){
            this.dialogTableVisible = true
        },
        back(){
            this.$router.go(-1)
        },
        getpage(){
            this.type = this.$route.params
            
            this.imgUrl = baseUrl+`/process-schedule/read-resource?processInstanceId=${this.type.processInstanceId}`
            // this.value=null
            // this.itemArr=null
            this.getProcessOption()
            // this.init()
            this.paramsList = eval("(" + this.type.processParams+ ")");
            console.log(this.type)
        },
        init(){
            if(this.type.exceptionNode!=null){
                this.err =  eval("(" + this.type.exceptionNode+ ")");
                console.log('err',this.err)
                for (const key in this.err) {
                    console.log(key)
                    if(this.value==key){
                        let a = key
                        console.log('222')
                        this.val=true
                        console.log(this.err[a])
                        this.title = this.err[a]
                    }
                }
            }
            
        },
        // 获取选项
        getProcessOption(){
            let that = this
            getOption(that.type.processInstanceId).then(res=>{
                // console.log(this.type)
                
                if(res.data.status==0){
                    that.options = res.data.data
                    console.log(that.options)
                }
                
            })
        },
        // 改变选项值
        changeOption(val){
            console.log(this.value)
            let that = this
            let obj = {};
            obj = that.options.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.processNode === val;//筛选出匹配数据
                
            });
            // console.log(obj);//我这边的name就是对应label的
            let params = {
                processInstanceId:obj.processInstanceId,
                processNode:obj.processNode
            }
            getOptionState(params).then(res=>{
                console.log(obj.processInstanceId)
                if(res.data.status==0){
                    console.log('22',res)
                    that.itemArr = res.data.data;
                    console.log('1111',that.itemArr)
                    this.init()
                }
            })
        }
    },
}
</script>
<style lang="less" scoped>
    #processDetail{
        height: 100%;
        background-color: #eee;
        // padding: 20px;
        box-sizing: border-box;
        .title{
            padding:0 20px;
            background-color: #fff;
            padding-top: 10px;
            border-bottom: 1px solid #eee;
            position: relative;
            margin-bottom: 20px;
            .back{
                position: absolute;
                right: 20px;
                top: 25px;
                color: #4CAEF2;
                font-size: 14px;
            }
            p{
                // padding-left:20px; 
                line-height: 36px;
                color: #666;
            }
            span{
                font-size: 18px;
                font-weight: 600;
            }
        }
        .center{
            height: 800px;
            background-color: #eee;
            margin: 0 20px;
            .top{
                height: 290px;
                display: flex;
                justify-content: space-between;
                // align-items: center;
                
                .left{
                    height: 270px;
                    width: 70%;
                    margin: 0 20px 20px 0;
                    // border: 1px solid #ddd;
                    background-color: #fff;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .right{
                    height: 270px;
                    // border: 1px solid #ddd;
                    width: 29%;
                    min-width: 320px;
                    background-color: #fff;
                    margin-bottom: 20px;
                    p{
                        padding:10px;
                        color: #333;
                        font-weight: bold;
                        font-size: 16px;
                        border-bottom: 1px solid #eee;
                    }
                    .msg{
                        padding: 0 15px;
                        .rule{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 14px;
                            color: #333;
                            margin: 15px 0;
                            .left1{
                                width: 56px;
                            }
                            .right1{
                                width: 230px;
                                text-align: right;
                            }
                        }
                    }
                }
            }
            .bottom{
                display: flex;
                justify-content: space-between;
                // align-items: center;
                .state{
                    width: 70%;
                    height: 545px;
                    // border: 1px solid #ddd;
                    margin-right: 20px;
                    background-color: #fff;
                    .options{
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        height: 70px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                        .select{
                            p{
                                line-height: 30px;
                                padding-left: 20px;
                                color: #333;
                                font-weight: bold;
                                font-size: 16px;
                            }
                            .el-select{
                                width: 150px;
                                margin-left: 20px;
                            }
                        }
                        .status{
                            text-align: right;
                            margin-right: 40px;
                            span{
                                &:first-child{
                                    color: #333;
                                    // font-weight: 600;
                                    font-size: 14px;
                                    margin-right: 5px;
                                }
                                &:last-child{
                                    color:#4CAEF2;
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                    .toggleState{
                        padding: 10px 20px;
                        >div{
                            margin: 10px 0;
                            padding: 10px;
                            overflow: auto;
                        }
                        .state1,.state2,.state3{
                            height: 100px;
                            // border: 1px solid #eee;
                            background-color: #F9F9F9;
                            p{
                                line-height: 24px;
                                font-size: 16px;
                                font-weight: 600
                            }
                            div{
                                font-size: 14px;
                                span{
                                    font-weight: 600;
                                    width: 90px;
                                    font-size: 14px;
                                    color: #333;
                                    display: inline-block;
                                }
                            }
                            &.state2{
                                height: 65px;
                            }
                        }
                        // .state2{
                        //     height: 100px;
                        //     border: 1px solid #eee;
                        // }
                        // .state3{
                        //     height: 100px;
                        //     border: 1px solid #eee;
                        // }
                    }
                }
                .node{
                    width: 29%;
                    min-width: 320px ;
                    height: 545px;
                    // border: 1px solid #ddd;
                    background-color: #fff;
                    p{
                        padding:10px 20px 10px 20px;
                        color: #333;
                        font-weight: bold;
                        font-size: 16px;
                        border-bottom: 1px solid #eee;
                    }
                    div{
                        height: 380px;
                        margin: 10px;
                        color: #444;
                        font-size: 14px;
                        overflow: scroll;
                    }
                }
            }
        }
        
    }
</style>
<style lang="less">
        .pics{
            .el-dialog{
                width: 90% !important;
                top: 5% !important;
                height:95vh !important;
                .el-dialog__body{
                    padding:0 20px !important;
                    height:100%
                }
                img{
                    width: 100%;
                    height: 90%;
                }
            }
        }
</style>



