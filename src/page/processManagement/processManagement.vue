<template>
    <div id="process">
        <div class="top">流程实例日志</div>
        <div class="center">
            <div class="condition">搜索条件</div>
            <div class="searchList">
                <el-row style="display:flex;justify-content: space-around;">
                    <el-col :span="3">
                        <el-input @blur="getName" v-model="input" placeholder="流程名称"></el-input>
                    </el-col>
                    <el-col style="width:350px">
                        <!-- <span class="demonstration">带快捷选项</span> -->
                        <!-- <div class="block"> -->
                            <el-date-picker
                            v-model="value1"
                            @change="getTime"
                            placeholder="选择时间范围"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        <!-- </div> -->
                        
                    </el-col>
                    <el-col :span="3">
                        <el-input @blur="getPerson" v-model="person" placeholder="操作人"></el-input>
                    </el-col>
                    <el-col style="width:200px">
                        <div class="status">

                            <p>流程状态</p>
                        
                            <el-select v-model="value" placeholder="全部" @change="change">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        
                        </div>
                    </el-col>
                    <el-col :span="3" style="text-align: right;">
                        <el-button @click="search" type="danger">搜索</el-button>
                    </el-col>
                    
                </el-row>
            </div>
        </div>
        <div class="bottom">
            <div class="title">流程实例</div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <!-- <el-table-column
                    prop="uptownName"
                    label="小区名称"
                    width="">
                </el-table-column> -->
                <el-table-column
                    prop="name"
                    label="流程名称"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="processMonth"
                    label="流程类型"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="processMonth"
                    label="流程月份"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="processStatus"
                    label="流程状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.processStatus == '1'">启动中</span>
                        <span v-if="scope.row.processStatus == '2'">已完结</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="procDefId"
                    label="流程模板ID"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="processInstanceId"
                    label="流程实例ID"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="createId"
                    label="操作人"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="updateId"
                    label="更新人"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="processException"
                    label="是否异常"
                    width="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.processException == '0'">正常</span>
                        <span v-if="scope.row.processException == '1'">异常</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="exceptionNode"
                    label="异常节点信息"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    width="">
                    <template slot-scope="scope">
                        {{ scope.row.updateTime | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="60">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="itemArr.current"
                :page-size="itemArr.size"
                layout="prev, pager, next, jumper"
                :total="itemArr.total">
                </el-pagination>
        </div>
    </div>
</template>
<script>
    import { getProcesses } from '../../../unfetch/api.js'
    
    export default {
        name:"processManagement",

    	data(){
            return{
                input:"",
                pageNo:1,
                currentPage: 1,
                value: "",
                value1:[new Date(2019, 3, 10, 10, 10), new Date(2019, 4, 11, 10, 10)],
                person:null,
                itemArr:{},
                processStatus:null,
                processName:null,
                startTime:null,
                endTime:null,
                options: [
                    {
                        value: '选项1',
                        label: '启动中'
                    }, 
                    {
                        value: '选项2',
                        label: '已完结'
                    }
                ],
                tableData: [
                    
                ],
                item:{}
            }
        },
        
        created() {
            this.getProcesse()
        },
        mounted() {
            
        },
        watch: {
            '$route':'getpage'
        },
        methods: {
            getpage(){
                this.getProcesse()
            },
            // 格式化时间
            formatTen(num) { 
                return num > 9 ? (num + "") : ("0" + num); 
            },
            formatDate(date) { 
                var year = date.getFullYear(); 
                var month = date.getMonth() + 1; 
                var day = date.getDate(); 
                var hour = date.getHours(); 
                var minute = date.getMinutes(); 
                var second = date.getSeconds(); 
                return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) + " "+ this.formatTen(hour) + ":"+this.formatTen(minute)+":"+this.formatTen(second); 
            },
            getProcesse(){
                let that = this
                let params ={
                    pageNo: that.pageNo,
                    pageSize: 3,
                    startTime:that.startTime,
                    endTime:that.endTime,
                    processStatus:that.processStatus,
                    processName:that.input,
                    createId:that.person
                }
                // if()
                getProcesses(params).then(res=>{
                    // console.log(res)
                    if (res.data.status == 0) {
                        // console.log(res)
                        // 分页使用
                        this.itemArr=res.data.data;
                        // 渲染数据使用
                        this.tableData = res.data.data.records;
                        console.log(this.tableData)
                    }
                })
                
            },
            search(){
                console.log(this.value1)
                this.getProcesse()
            },
            change(val){
                if(val=="选项1"){
                    this.processStatus=1
                }else(
                    this.processStatus=2
                )
                // console.log(this.processStatus)
            },
            getPerson(){
                if(this.person==''){
                    this.person=null
                }
            },
            getName(){
                console.log(this.input)
                // if(this.input=="催缴"){
                //     this.processName="reminder_arrearage"
                //     // console.log(this.processName)
                // }else if(this.input=="审计"){
                //     this.processName="car_auto_audit"
                //     // console.log(this.processName)
                // }else if(this.input=="例行任务"){
                //     this.processName="routine_task"
                //     // console.log(this.processName)
                // }else{
                //     this.processName=null
                // }
            },
            getTime(){
                // this.filterTime = this.formatDate(this.value1[0]) + " - " + this.formatDate(this.value1[1])
                // console.log(this.filterTime)
             
                // this.startTime = this.formatDate(this.value1[0])
                // this.endTime = this.formatDate(this.value1[1])
                if(this.value1!=''){
                    this.$nextTick(() => {
                        this.startTime = this.formatDate(this.value1[0])
                        this.endTime = this.formatDate(this.value1[1])
                    })
                }
                
            },
            handleClick(type){
                this.item = type

                this.$router.push({
                    name:"processDetail",
                    params: this.item 
                })
                // console.log(type)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNo=val
                this.getProcesse()
            }
        },
    }
</script>
<style lang="less" scoped>

    #process{
        min-width: 1000px;
        padding: 20px;
        background-color: #eee;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        .top{
            height: 44px;
            line-height: 44px;
            background-color: #fff;
            color: rgb(255, 104, 155);
            font-size: 16px;
            padding-left: 20px;
        }
        .center{
            margin-top: 10px;
            background-color: #fff;
            .condition{
                background-color: #ddd;
                height: 62px;
                line-height: 62px;
                color: #333;
                padding-left: 20px;
                font-weight: 600;
            }
            .searchList{
                height: 100px;
                line-height: 100px;
                .status{
                    display: flex;
                    align-items: center;
                    p{
                        width: 110px;
                    }
                }
            }
        }
        .bottom{
            margin-top: 10px;
            background-color: #fff;
            .title{
                background-color: #ddd;
                height: 62px;
                line-height: 62px;
                color: #333;
                padding-left: 20px;
                font-weight: 600;
            }
        }
    }
</style>
<style lang="less">
    .el-table .cell, .el-table th>div{
        padding-left:10px;
        padding-right:10px;
    }
    .el-pagination{
        text-align:right;
        padding: 10px 20px !important;
    }
    // .el-select-dropdown{
    //     top: 200px !important;
    // }
    td,th{
        >div{
            text-align:center;
        }
    }
</style>



