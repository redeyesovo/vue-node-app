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

                    <el-form-item prop='oaid' label="公众号id:">
                        <el-input type="oaid" v-model="formData.oaid"></el-input>
                    </el-form-item>

                    <el-form-item prop='oaname' label="公众号名称:">
                        <el-input type="oaname" v-model="formData.oaname"></el-input>
                    </el-form-item>

                    <el-form-item prop='stationname' label="站点名称:">
                        <el-input type="stationname" v-model="formData.stationname"></el-input>
                    </el-form-item>

                    <el-form-item prop='platname' label="平台名称:">
                        <el-input type="platname" v-model="formData.platname"></el-input>
                    </el-form-item>

                    <el-form-item prop='source' label="数据源/微信应用id:">
                        <el-input type="source" v-model="formData.source"></el-input>
                    </el-form-item>

                    <el-form-item prop='runer' label="运营人:">
                        <el-input type="runer" v-model="formData.runer"></el-input>
                    </el-form-item>

                    <el-form-item prop='sex' label="性别:">
                        <el-input type="sex" v-model="formData.sex"></el-input>
                    </el-form-item>

                    <el-form-item prop='company' label="所属公司:">
                        <el-input type="company" v-model="formData.company"></el-input>
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
                    oaid: [
                        { required: true, message: "公众号id不能为空！", trigger: "blur" }
                    ],
                    oaname: [
                        { required: true, message: "公众号名不能为空！", trigger: "blur" }
                    ],
                    state: [
                        { required: true, message: "状态不能为空！", trigger: "blur" }
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
                        this.$axios.post(`/api/oas/${url}`, this.formData).then(res => {
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

