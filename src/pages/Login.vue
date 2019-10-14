<template>
<layout>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols=12 sm=9 md=7 lg=5 xl=4>
                <v-card>
                    <v-toolbar @click="request()" color="grey darken-3" dark flat dense>
                        <v-toolbar-title>ورود</v-toolbar-title>
                        <div class="flex-grow-1"></div>
                        <v-icon>mdi-account</v-icon>
                    </v-toolbar>
                    <v-alert v-show="shw_form_alert" transition="fade-transition" :type="type" text tile>{{ alert_msg }}</v-alert>
                    <v-card-text>
                        <v-form>
                            <v-text-field name="email" label="آدرس ایمیل" v-model="loginForm.email" type="email"></v-text-field>
                            <v-text-field name="password" label="رمز عبور" v-model="loginForm.password" type="password"></v-text-field>
                            <v-col cols=12 class="pa-0">
                                <v-btn :loading="loading" :disabled="disabled" color="primary" @click="login()">
                                    ورود
                                </v-btn>
                                <v-btn text class="px-2 py-1 mr-2 my-1" :href="this.baseUrl+ '/password/reset'">
                                    رمز عبور خود را فراموش کرده اید؟
                                </v-btn>
                            </v-col>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</layout>
</template>

<script>
export default {
    data() {
        return {
            alert_msg: '',
            shw_form_alert: false,
            loading: false,
            type: 'error',
            disabled: false,
            loginForm: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        async login() {
            this.shw_form_alert = false;
            this.loading = true;
            var bodyFormData = new FormData();
            bodyFormData.set('email', this.loginForm.email);
            bodyFormData.set('password', this.loginForm.password);
            try {
                const response = await this.$http({
                    method: 'post',
                    url: 'http://localhost/laravel/api/login',
                    data: bodyFormData,
                    config: {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                });
                this.disabled = true;
                const jwt_token = response.data.access_token;
                this.$cookie.set('jwt_token', jwt_token, 7);
                var today = new Date();
                var nextWeek = this.addDays(today, 6);
                this.$cookie.set('token_expiration', nextWeek.getTime(), 7);
                this.type = "success";
                this.shw_form_alert = true;
                this.alert_msg = "با موفقیت وارد شدید. در حال انتقال به پروفایل کاربری ...";
                this.$router.push('/dashboard');
            } catch (error) {
                this.type = "error";
                this.shw_form_alert = true;
                this.alert_msg = "نام کاربری یا رمزعبور اشتباه است.";
            }
            this.loading = false;
        },
    },

}
</script>

<style>

</style>
