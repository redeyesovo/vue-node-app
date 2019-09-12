<template>
    <div class="dialog">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <div class="form">
                <el-form
                        ref="form"
                        :model="formData"
                        :rules="form_rules"
                        label-width="120px"
                        style="margin:10px;width:auto;">

                    <el-form-item prop='username' label="用户名:">
                        <el-input type="username" v-model="formData.username"></el-input>
                    </el-form-item>

                    <el-form-item prop='othername' label="别名:">
                        <el-input type="othername" v-model="formData.othername"></el-input>
                    </el-form-item>

                    <el-form-item prop='ifuseful'  label="是否可用:">
                        <el-input type="ifuseful" v-model="formData.ifuseful"></el-input>
                    </el-form-item>

                    <el-form-item prop='description' label="描述:">
                        <el-input type="description" v-model="formData.description"></el-input>
                    </el-form-item>

                    <el-form-item prop='character' label="角色:">
                        <el-input type="character" v-model="formData.character"></el-input>
                    </el-form-item>

                    <el-form-item prop="creater" label="创建人:">
                        <el-input type="creater" v-model="formData.creater"></el-input>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dialog",
        props: {
            dialog: Object,
            formData: Object
        },
        data() {
            return {
                form_rules: {
                    username: [
                        { required: true, message: "用户名不能为空！", trigger: "blur" }
                    ],
                    othername: [
                        { required: true, message: "别名不能为空！", trigger: "blur" }
                    ],
                    ifuseful: [
                        { required: true, message: "是否可用不能为空！", trigger: "blur" }
                    ],
                    creater: [{ required: true, message: "创建人不能为空！", trigger: "blur" }]
                }
            };
        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        //表单数据验证完成之后，提交数据;
                        const url = this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
                        this.$axios.post(`/api/profiles/${url}`, this.formData).then(res => {
                            // 操作成功
                            this.$message({
                                message: "保存成功！",
                                type: "success"
                            });
                            this.dialog.show = false;
                            this.$emit("update");
                        });
                    }
                });
            },

        }
    };
</script>

