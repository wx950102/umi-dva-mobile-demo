import React from 'react';
import { connect } from 'dva';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from './logo'
import styles from './index.less'

@connect(({ login }) => ({ login }))
class LoginNew extends React.Component {
  sumbit = () => {
    this.props.dispatch({
      type: "login/login"
    })
  }
  onChange = (type, value) => {
    const { login: { loginForm, loginError } } = this.props
    if (type === 'username') {
      this.props.dispatch({
        type: "login/updateData",
        payload: {
          loginForm: {
            ...loginForm,
            username: value
          },
          loginError: {
            ...loginError,
            usernameError: value.replace(/\s/g, '').length < 10
          }
        }
      })
    }
    if (type === 'password') {
      this.props.dispatch({
        type: "login/updateData",
        payload: {
          loginForm: {
            ...loginForm,
            password: value
          },
          loginError: {
            ...loginError,
            passwordError: value.replace(/\s/g, '').length < 12 && value.replace(/\s/g, '').length > 6
          }
        }
      })
    }
  }
  render() {
    const {
      login: {
        loginForm: { username, password },
        loginError: { usernameError, passwordError }
      }
    } = this.props
    const userNameProps = {
      editable: true,
      clear: true,
      error: usernameError,
      onChange: this.onChange.bind(this, 'username')
    }
    const passwordProps = {
      editable: true,
      clear: true,
      error: passwordError,
      onChange: this.onChange.bind(this, 'password')
    }
    return (
      <div className={styles.bg_img}>
        <div style={{ padding: 10 }}>
          <WingBlank style={{ zIndex: 999 }}>
            <Logo />
            <List>
              <InputItem value={username} {...userNameProps} >userName:</InputItem>
              <InputItem type="password" value={password} {...passwordProps}>passWord:</InputItem>
            </List>
            <WhiteSpace />
            <Button onClick={this.sumbit.bind(this)} className={styles.login_button}>Login</Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}
export default LoginNew
