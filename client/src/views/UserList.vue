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
                    prop="username" label="用户名" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="othername" label="别名" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="ifuseful" label="是否可用" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="description" label="描述" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="character" label="角色" width="200" align="center"
                ></el-table-column>
                <el-table-column
                        prop="creater" label="创建人" width="200" align="center"
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
                        >编辑</el-button>
                        <el-button
                                type="delete"
                                icon='delete'
                                size="small"
                                @click='handleDelete(scope.$index,scope.row)'
                        >删除</el-button>
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
        <DialogFound :dialog='dialog' :formData='formData' @update="getProfile"></DialogFound>
    </div>
</template>

<script>
    import DialogFound from "../components/DialogFound";
    export default {
        name: "UserList",
        data() {
            return {
                tableData: [],
                allTableData: [],
                filterTableData: [],
                dialog: {
                    show: false,
                    title: "",
                    option: "edit"
                },
                formData: {
                    username: "",
                    othername: "",
                    ifuseful: "",
                    description: "",
                    character: "",
                    creater: "",
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
            DialogFound
        },
        created() {
            this.getProfile();
        },
        methods:{
            getProfile() {
                // 获取表格数据
                this.$axios("/api/profiles").then(res => {
                    //this.tableData = res.data;
                    //console.log(res)
                    this.allTableData = res.data;
                    this.filterTableData = res.data;
                    // 设置分页数据
                    this.setPaginations();
                });
            },
            handleEdit(index,row){
                //console.log(123);
                this.dialog = {
                    show: true,
                    title: "修改用户信息",
                    option: "edit"
                };
                this.formData = {
                    username: row.username,
                    othername: row.othername,
                    ifuseful: row.ifuseful,
                    description: row.description,
                    character: row.character,
                    creater: row.creater,
                    id: row._id
                };
            },
            handleDelete(index,row){
                //console.log(456);
                // 删除
                this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
                    this.$message("删除成功");
                    this.getProfile();
                });
            },
            handleAdd(){
                //console.log(789);
                this.dialog = {
                    show: true,
                    title: "添加用户信息",
                    option: "add"
                };
                this.formData = {
                    username: "",
                    othername: "",
                    ifuseful: "",
                    description: "",
                    character: "",
                    creater: "",
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
                    this.getProfile();
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