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
                    <el-button type="primary" size ="small" icon="search" @click='handleSearch()'>筛选</el-button>
                </el-form-item>
                <el-form-item class="btnLeft">
                    <el-button type="primary" size ="small" icon="view" @click='handleAdd()'>添加</el-button>
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
                        prop="stationid" label="站点id" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="stationname" label="站点名称" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="platid" label="平台id" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="platname" label="平台名称" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="state" label="状态" width="200" align="center"
                ></el-table-column>

                <el-table-column
                        prop="date" label="创建时间" width="250" align="center" sortable
                >
                    <temstatione slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </temstatione>
                </el-table-column>

                <el-table-column
                        prop="operation"
                        align='center'
                        label="操作"
                        fixed="right"
                        width="150"
                >

                    <temstatione slot-scope='scope'>
                        <el-button
                                type="edit"
                                icon='edit'
                                size="small"
                                @click='handleEdit(scope.$index,scope.row)'
                        >编辑</el-button>
                        <el-button
                                type="delete"
                                icon='delete'
                                size="small"
                                @click='handleDelete(scope.$index,scope.row)'
                        >删除</el-button>
                    </temstatione>
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
        <DialogStation :dialog='dialog' :formData='formData' @update="getStation"></DialogStation>
    </div>
</template>

<script>
    import DialogStation from "../components/DialogStation";
    export default {
        name: "StationManage",
        data() {
            return {

                time:null,
                tableData: [],
                allTableData: [],
                filterTableData: [],
                dialog: {
                    show: false,
                    title: "",
                    option: "edit"
                },
                formData: {
                    stationid: "",
                    stationname: "",
                    platid: "",
                    platname: "",
                    state: "",
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
            DialogStation
        },
        created() {
            this.getStation();
            this.getCurrentDateTime();
        },
        methods:{
            getCurrentDateTime(){
                return moment(formData.date).format('YYYY-MM-DD HH:mm:ss')
            },
            getStation() {
                // 获取表格数据
                this.$axios("/api/stations").then(res => {
                    //this.tableData = res.data;
                    //console.log(res)
                    this.allTableData = res.data;
                    this.filterTableData = res.data;
                    // 设置分页数据
                    const time = this.$moment(this.date).format('YYYY-MM-DD');
                    this.setPaginations();
                });
            },
            handleEdit(index,row){
                //console.log(123);
                this.dialog = {
                    show: true,
                    title: "修改站点信息",
                    option: "edit"
                };
                this.formData = {
                    stationid: row.stationid,
                    stationname: row.stationname,
                    platid: row.platid,
                    platname: row.platname,
                    state: row.state,
                    id: row._id
                };
            },
            handleDelete(index,row){
                //console.log(456);
                // 删除
                this.$axios.delete(`/api/stations/delete/${row._id}`).then(res => {
                    this.$message("删除成功");
                    this.getStation();
                });
            },
            handleAdd(){
                //console.log(789);
                this.dialog = {
                    show: true,
                    title: "添加站点信息",
                    option: "add"
                };
                this.formData = {
                    stationid: "",
                    stationname: "",
                    platid: "",
                    platname: "",
                    state: "",
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
            handleSearch(){
                if (!this.search_data.startTime || !this.search_data.endTime) {
                    this.$message({
                        type: "warning",
                        message: "请选择时间区间"
                    });
                    this.getStation();
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
    .btnLeft {
        float: left;
    }
    .pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>