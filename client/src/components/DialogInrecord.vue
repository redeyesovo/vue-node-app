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

                    <el-form-item prop='streamid' label="流水号:">
                        <el-input type="streamid" v-model="formData.streamid"></el-input>
                    </el-form-item>

                    <el-form-item prop='streamtime' label="日期:">
                        <el-input type="streamtime" v-model="formData.streamtime"></el-input>
                    </el-form-item>

                    <el-form-item prop='medianame' label="媒介名称:">
                        <el-input type="medianame" v-model="formData.medianame"></el-input>
                    </el-form-item>

                    <el-form-item prop='representname' label="代理名称:">
                        <el-input type="representname" v-model="formData.representname"></el-input>
                    </el-form-item>

                    <el-form-item prop='money' label="金额:">
                        <el-input type="money" v-model="formData.money"></el-input>
                    </el-form-item>

                    <el-form-item prop='description' label="备注:">
                        <el-input type="description" v-model="formData.description"></el-input>
                    </el-form-item>

                    <el-form-item prop='operator' label="操作员:">
                        <el-input type="operator" v-model="formData.operator"></el-input>
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
                    streamid: [
                        { required: true, message: "公众号id不能为空！", trigger: "blur" }
                    ],
                    streamtime: [
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
                        this.$axios.post(`/api/inrecords/${url}`, this.formData).then(res => {
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

