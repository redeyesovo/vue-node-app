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

                    <el-form-item prop='representid' label="媒介id:">
                        <el-input type="representid" v-model="formData.representid"></el-input>
                    </el-form-item>

                    <el-form-item prop='representname' label="媒介名称:">
                        <el-input type="representname" v-model="formData.representname"></el-input>
                    </el-form-item>

                    <el-form-item prop='description'  label="描述:">
                        <el-input type="description" v-model="formData.description"></el-input>
                    </el-form-item>

                    <el-form-item prop='state'  label="状态:">
                        <el-input type="state" v-model="formData.state"></el-input>
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
                    representid: [
                        { required: true, message: "用户名不能为空！", trigger: "blur" }
                    ],
                    representname: [
                        { required: true, message: "别名不能为空！", trigger: "blur" }
                    ],
                    state: [
                        { required: true, message: "是否可用不能为空！", trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        //表单数据验证完成之后，提交数据;
                        const url = this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
                        this.$axios.post(`/api/represents/${url}`, this.formData).then(res => {
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

