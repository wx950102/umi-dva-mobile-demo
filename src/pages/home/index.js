import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile'
import Search from '@/components/Search/index.js'
import styles from './index.less'
import head from '../../assets/WechatIMG34.jpeg'
import head2 from '../../assets/headImage/WechatIMG37.jpeg'
import head3 from '../../assets/headImage/WechatIMG48.jpeg'
import head4 from '../../assets/headImage/WechatIMG47.jpeg'
import noise from '../../assets/静音.png'
import router from 'umi/router';
@connect(({ home, login }) => ({ home, login }))
class Home extends Component {
  state = {
    imgList: [
      {
        img: head,
        name: "Sweetheart❤恋人",
      },
      {
        img: head2,
        name: "🌞",
        noise: noise
      },
      {
        img: head3,
        name: "🌛",
        noise: noise
      },
      {
        img: head4,
        name: "✨",
        noise: noise
      },
      {
        img: head2,
        name: "🌟",
      },
      {
        img: head,
        name: "Sweet",
      },
      {
        img: head2,
        name: "Heart",
      },
      {
        img: head3,
        name: "Love"
      },
      {
        img: head4,
        name: "❤️"
      },
      {
        img: head2,
        name: "🌟",
        noise: noise
      },
    ]
  }
  render() {
    return (
      <div style={{ flex: 1, height: "100%", width: "100%", background: "#F5F5F5" }}>
        <Search onSearch={(val) => console.log("val", val)} placeholder="搜索" maxLength={8} />
        {/* 卡片 */}
        {this.state.imgList.map((itm, index) => (
          <List key={index} className={styles.list_item}>
            <List.Item
              thumb={<img src={itm.img} alt="" className={styles.headImage} />}
              extra={
                <div>
                  <div>15:13</div>
                  {itm.noise && <img src={itm.noise} alt="" style={{ height: 15, width: 15 }} />}
                </div>
              }
              onClick={() => { router.push('./chat') }}
            >
              <div>
                <span style={{ fontSize: 20 }}>{itm.name}</span>
                <div className={styles.en_name}>{`我在上班❤️`}</div>
              </div>
            </List.Item>
          </List>
        ))}
      </div>
    )
  }
}


export default Home;
