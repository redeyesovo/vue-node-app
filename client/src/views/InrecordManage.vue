<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data" :model="search_data">
                <el-form-item label="时间筛选:">
                    <el-date-picker
                            v-model="search_data.startTime"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                    <el-date-picker
                            v-model="search_data.endTime"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
<<<<<<< HEAD
                    <el-button type="primary" size="small" icon="search" @click='handleSearch()'>筛选</el-button>
                </el-form-item>
                <el-form-item class="btnLeft">
                    <el-button type="primary" size="small" icon="view" @click='handleAdd()'>添加</el-button>
=======
                    <el-button type="primary" size ="small" icon="search" @click='handleSearch()'>筛选</el-button>
                </el-form-item>
                <el-form-item class="btnLeft">
                    <el-button type="primary" size ="small" icon="view" @click='handleAdd()'>添加</el-button>
>>>>>>> refs/remotes/origin/master
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                    v-if="tableData.length > 0"
                    :data="tableData"
                    style="width: 100%"
                    max-height="450"
                    border
            >
                <el-table-column
                        type="index"
                        label="序号"
                        align='center'
                        width="70">
                </el-table-column>

                <el-table-column
                        prop="streamid" label="流水号" width="200" align="center"
                ></el-table-column>
                <el-table-column
<<<<<<< HEAD
                        prop="streamtime" label="时间" width="200" align="center" sortable
=======
                        prop="streamtime" label="时间" width="200" align="center"
>>>>>>> refs/remotes/origin/master
                ></el-table-column>
                <el-table-column
                        prop="medianame" label="媒介" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="representname" label="代理" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="money" label="金额" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="description" label="备注" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="operator" label="操作人" width="200" align="center"
                ></el-table-column>


                <el-table-column
                        prop="date" label="创建时间" width="250" align="center" sortable
                >
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="operation"
                        align='center'
                        label="操作"
                        fixed="right"
                        width="150"
                >

                    <template slot-scope='scope'>
                        <el-button
                                type="edit"
                                icon='edit'
                                size="small"
                                @click='handleEdit(scope.$index,scope.row)'
<<<<<<< HEAD
                        >编辑
                        </el-button>
=======
                        >编辑</el-button>
>>>>>>> refs/remotes/origin/master
                        <el-button
                                type="delete"
                                icon='delete'
                                size="small"
                                @click='handleDelete(scope.$index,scope.row)'
<<<<<<< HEAD
                        >删除
                        </el-button>
=======
                        >删除</el-button>
>>>>>>> refs/remotes/origin/master
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                                v-if='paginations.total > 0'
                                :page-sizes="paginations.page_sizes"
                                :page-size="paginations.page_size"
                                :layout="paginations.layout"
                                :total="paginations.total"
                                :current-page.sync='paginations.page_index'
                                @current-change='handleCurrentChange'
                                @size-change='handleSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>

        </div>
        <DialogInrecord :dialog='dialog' :formData='formData' @update="getInrecord"></DialogInrecord>
    </div>
</template>

<script>
    import DialogInrecord from "../components/DialogInrecord";
<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/master
    export default {
        name: "InrecordManage",
        data() {
            return {

<<<<<<< HEAD
                time: null,
=======
                time:null,
>>>>>>> refs/remotes/origin/master
                tableData: [],
                allTableData: [],
                filterTableData: [],
                dialog: {
                    show: false,
                    title: "",
                    option: "edit"
                },
                formData: {
                    streamid: "",
                    streamtime: "",
                    medianame: "",
                    representname: "",
                    money: "",
                    description: "",
                    operator: "",
                    id: ""
                },
                //需要给分页组件传的信息
                paginations: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },
                search_data: {
                    startTime: "",
                    endTime: ""
                }
            };
        },

        components: {
            DialogInrecord
        },
        created() {
            this.getInrecord();
            this.getCurrentDateTime();
        },
<<<<<<< HEAD
        methods: {
            getCurrentDateTime() {
=======
        methods:{
            getCurrentDateTime(){
>>>>>>> refs/remotes/origin/master
                return moment(formData.date).format('YYYY-MM-DD HH:mm:ss')
            },
            getInrecord() {
                // 获取表格数据
                this.$axios("/api/inrecords").then(res => {
                    //this.tableData = res.data;
                    //console.log(res)
                    this.allTableData = res.data;
                    this.filterTableData = res.data;
                    // 设置分页数据
                    const time = this.$moment(this.date).format('YYYY-MM-DD');
                    this.setPaginations();
                });
            },
<<<<<<< HEAD
            handleEdit(index, row) {
=======
            handleEdit(index,row){
>>>>>>> refs/remotes/origin/master
                //console.log(123);
                this.dialog = {
                    show: true,
                    title: "修改公众号信息",
                    option: "edit"
                };
                this.formData = {
                    streamid: row.streamid,
                    streamtime: row.streamtime,
                    medianame: row.medianame,
                    representname: row.representname,
                    money: row.money,
                    description: row.description,
                    operator: row.operator,
                    id: row._id
                };
            },
<<<<<<< HEAD
            handleDelete(index, row) {
=======
            handleDelete(index,row){
>>>>>>> refs/remotes/origin/master
                //console.log(456);
                // 删除
                this.$axios.delete(`/api/inrecords/delete/${row._id}`).then(res => {
                    this.$message("删除成功");
                    this.getInrecord();
                });
            },
<<<<<<< HEAD
            handleAdd() {
=======
            handleAdd(){
>>>>>>> refs/remotes/origin/master
                //console.log(789);
                this.dialog = {
                    show: true,
                    title: "添加充值信息",
                    option: "add"
                };
                this.formData = {
                    streamid: "",
                    streamtime: "",
                    medianame: "",
                    representname: "",
                    money: "",
                    description: "",
                    operator: "",
                    id: ""
                };
                this.dialog.show = true;
            },
            setPaginations() {
                // 总页数
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                // 设置默认分页数据
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            handleCurrentChange(page) {
                // 当前页
                let sortnum = this.paginations.page_size * (page - 1);
                let table = this.allTableData.filter((item, index) => {
                    return index >= sortnum;
                });
                // 设置默认分页数据
                this.tableData = table.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            handleSizeChange(page_size) {
                // 切换size
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size;
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < page_size;
                });
            },
<<<<<<< HEAD
            handleSearch() {
=======
            handleSearch(){
>>>>>>> refs/remotes/origin/master
                if (!this.search_data.startTime || !this.search_data.endTime) {
                    this.$message({
                        type: "warning",
                        message: "请选择时间区间"
                    });
                    this.getInrecord();
                    return;
                }
                const stime = this.search_data.startTime.getTime();
                const etime = this.search_data.endTime.getTime();
                this.allTableData = this.filterTableData.filter(item => {
                    let date = new Date(item.date);
                    let time = date.getTime();
                    return time >= stime && time <= etime;
                });
                // 分页数据
                this.setPaginations();
            }

        }
    }
</script>

<style scoped>
    .fillContainer {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
<<<<<<< HEAD

    .btnLeft {
        float: left;
    }

=======
    .btnLeft {
        float: left;
    }
>>>>>>> refs/remotes/origin/master
    .pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>