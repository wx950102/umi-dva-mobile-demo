import React, { useEffect } from 'react'
import { List, SwipeAction } from 'antd-mobile'
import Search from '@/components/Search/index.js'
import { connect } from 'dva';
import styles from './index.less'
import Scroll from 'react-scroll-mobile'
import head1 from '@/assets/WechatIMG34.jpeg'
import router from 'umi/router';

const ClassPage = ({
  dispatch,
  addressList: { logs, currentIndex, HOT_NAME, HOT_SINGER_LEN, list, page },
  loading
}) => {
  useEffect(() => {
    dispatch({
      type: "addressList/selectaddressListPage"
    })
    handleList()
  }, [])

  const handleList = () => {
    //歌手列表渲染
    let map = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    list.forEach((item, index) => {
      if (index < HOT_SINGER_LEN) {
        map.hot.items.push({
          name: item.name,
          avatar: item.img
        })
      }
      const key = item.index
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push({
        name: item.name,
        avatar: item.img
      })
    })
    // 为了得到有序列表，我们需要处理 map
    let ret = []
    let hot = []
    for (let key in map) {
      let val = map[key]
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title === HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return dispatch({
      type: 'addressList/updateData',
      payload: {
        logs: hot.concat(ret)
      }
    })
  }

  // 遍历通讯录列表
  const renderList = () => {
    let items = (
      <>
        <Scroll
          noMore={loading.effects['addressList/selectaddressListPage']}
          backTop
          pullDownRefresh={async () => {
            dispatch({
              type: "addressList/updateData",
              payload: {
                page: 1
              }
            })
            dispatch({
              type: "addressList/selectaddressListPage"
            })
          }}
          pullUpLoad={() => {
            dispatch({
              type: "addressList/updateData",
              payload: {
                page: page + 1
              }
            })
            dispatch({
              type: "addressList/selectaddressListPage"
            })
          }}
        >
          {/* 搜索栏 */}
          <Search onSearch={(val) => console.log("val", val)} placeholder="搜索" maxLength={8} />
          {/* 通讯栏 */}
          {
            list.map((itm, index) => (
              <div key={index} >
                <div style={{ paddingLeft: 15, fontWeight: 500, fontFamily: "cursive", background: "#F5F5F5" }} >{itm.index}</div>
                {itm.children.map((val, index) => (
                  <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    key={index}
                    autoClose
                    right={[
                      {
                        text: '备注',
                        onPress: () => { },
                        style: { backgroundColor: '#ddd', color: 'white' },
                      },
                      {
                        text: '删除',
                        onPress: () => { },
                        style: { backgroundColor: '#F4333C', color: 'white' },
                      },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                  >
                    <List key={index} className={styles.list_item} >
                      <List.Item
                        thumb={<img src={head1} alt="" className={styles.headImage} />}
                        arrow="horizontal"
                        onClick={() => { router.push('/detail') }}
                        style={{padding:10}}    
                      >
                        {val.name}
                      </List.Item>
                    </List>
                  </SwipeAction>
                )
                )}
              </div>
            )
            )
          }
        </Scroll>
      </>
    )
    return items
  }


  return (
    <div className={styles.log_list}>
      {/* 通讯+搜索 */}
      {renderList()}
      {/* 侧边字母导航 */}
      <div className={styles.list_shortcut}>
        {
          logs.map((item, index) => (
            <div className={currentIndex === index ? styles.current : null} key={index} >{item.title}</div>
          ))
        }
      </div>
    </div>
  )
}

export default connect(state => ({
  addressList: state.addressList,
  loading: state.loading,
}))(ClassPage)