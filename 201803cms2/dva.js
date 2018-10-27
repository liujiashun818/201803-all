import { message } from 'antd';

export function config() {
    return {
        //这个可以拦截异步和错误 
        onError(err) {
            err.preventDefault();
            message.error(err.message);
            console.log(err);
        },
        initialState: {

        },
    };
}