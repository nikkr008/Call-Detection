import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useUserContext} from '../utils/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Edit({navigation, route}) {
  const {user, updateUser} = useUserContext();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [image, setImage] = useState('');
  // const [location, setLocation] = useState('');

  const {id} = route?.params;
  const template = user?.messageTemplate?.find(
    e => e?.messagetemplateid === id,
  );

  useEffect(() => {
    if (template) {
      setTitle(template?.templatename);
      setContent(template?.templatecontent);
      setType(template?.templatetype?.toLowerCase());
      setImage(template?.templateimage);
      // setLocation(template?.templatelocation);
    }
  }, [id]);

  const upUser = {
    ...user,
    messageTemplate: user?.messageTemplate?.map(item => {
      if (item?.messagetemplateid === id) {
        return {
          createdon: item?.createdon,
          isactive: item?.isactive,
          messagetemplateid: id,
          templatecontent: content,
          templateimage: image,
          templatelocation: 'location',
          templatename: title,
          templatetype: type,
          userregistrationid: item?.userregistrationid,
        };
      } else {
        return item;
      }
    }),
  };

  const delUser = {
    ...user,
    messageTemplate: user?.messageTemplate?.filter(
      e => e?.messagetemplateid !== id,
    ),
  };

  const updateStorage = async val => {
    await AsyncStorage.setItem('CallZ1_User', JSON.stringify(val)).then(() => {
      navigation.goBack();
    });
  };

  const onCreate = async () => {
    setLoading(true);
    await fetch('http://62.72.56.22:8001/template', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        LoginMobileNumber: user?.loginmobilenumber,
        MessageTemplateId: id,
        TemplateName: title,
        TemplateContent: content,
        TemplateImage: '',
        TemplateLocation: '',
        TemplateType: type,
      }),
    })
      .then(res => {
        if (!res.ok) {
          res.json().then(e => {
            console.log(e);
            Alert.alert(e?.message);
          });
          // Alert.alert('Error updating template')
        } else {
          updateUser(upUser);
          updateStorage(upUser);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error updating template');
        setLoading(false);
      });
  };

  const onDelete = async () => {
    setDelLoading(true);
    await fetch('http://62.72.56.22:8001/template', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        LoginMobileNumber: user?.loginmobilenumber,
        MessageTemplateId: id,
      }),
    })
      .then(res => {
        if (!res.ok) {
          res.json().then(e => {
            console.log(e);
            Alert.alert(e?.message);
          });
          // Alert.alert('Error deleting template')
        } else {
          updateUser(delUser);
          updateStorage(delUser);
        }
        setDelLoading(false);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error deleting template');
        setDelLoading(false);
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            underlayColor={'#fff'}
            style={styles.arrowCon}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={'#000'} />
          </TouchableHighlight>
          <Text style={styles.title}>Edit Template</Text>
          <View style={styles.arrowCon} />
        </View>
        <Text style={styles.subTitle}>Title*</Text>
        <View style={styles.inputCon}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            selectionColor={'#6c64ff'}
            placeholderTextColor={'#aaa'}
            placeholder="Enter title"
          />
        </View>
        <Text style={styles.subTitle}>Content*</Text>
        <View style={styles.inputCon1}>
          <TextInput
            value={content}
            onChangeText={setContent}
            style={styles.input}
            selectionColor={'#6c64ff'}
            placeholderTextColor={'#aaa'}
            multiline
            placeholder="Enter content"
          />
        </View>
        {/* <Text style={styles.subTitle}>Location</Text>
        <View style={styles.inputCon}>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            selectionColor={'#6c64ff'}
            placeholderTextColor={'#aaa'}
            placeholder="Enter location"
          />
        </View> */}
        <Text style={styles.subTitle}>Type*</Text>
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.selectCon}
          onPress={() => setShow(true)}>
          <View style={styles.select}>
            <Text style={styles.selectText}>{type || 'Select type'}</Text>
            <Octicons name="chevron-right" color="#000" size={18} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'#7a73ff'}
          style={[styles.btn, {opacity: title && content && type ? 1 : 0.7}]}
          onPress={() => (title && content && type ? onCreate() : null)}>
          <Text style={styles.btnText}>{loading ? 'Updating' : 'Update'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'#7a73ff'}
          style={styles.btn1}
          onPress={() => onDelete()}>
          <Text style={styles.btnText}>
            {delLoading ? 'Please Wait' : 'Delete'}
          </Text>
        </TouchableHighlight>
      </ScrollView>
      <Modal
        visible={show}
        onRequestClose={() => setShow(false)}
        transparent
        statusBarTranslucent
        animationType="fade">
        <View style={styles.modal}>
          <View style={styles.modalCon}>
            <TouchableHighlight
              underlayColor={'#fff'}
              style={styles.modalItem}
              onPress={() => {
                setType('dialed');
                setShow(false);
              }}>
              <Text style={styles.modalItemText}>Dialed</Text>
            </TouchableHighlight>
            <View style={styles.modalSep} />
            <TouchableHighlight
              underlayColor={'#fff'}
              style={styles.modalItem}
              onPress={() => {
                setType('missed');
                setShow(false);
              }}>
              <Text style={styles.modalItemText}>Missed</Text>
            </TouchableHighlight>
            <View style={styles.modalSep} />
            <TouchableHighlight
              underlayColor={'#fff'}
              style={styles.modalItem}
              onPress={() => {
                setType('received');
                setShow(false);
              }}>
              <Text style={styles.modalItemText}>Received</Text>
            </TouchableHighlight>
            <View style={styles.modalSep} />
            <TouchableHighlight
              underlayColor={'#fff'}
              style={styles.modalItem}
              onPress={() => {
                setType('none');
                setShow(false);
              }}>
              <Text style={styles.modalItemText}>None</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  flexCon: {
    flex: 1,
  },
  arrowCon: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  selectCon: {
    maxHeight: 45,
    height: 45,
    flexDirection: 'row',
    flex: 1,
    color: '#000',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 7.5,
    paddingRight: 12.5,
  },
  select: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputCon: {
    height: 45,
    justifyContent: 'center',
    flex: 1,
    color: '#000',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 7.5,
  },
  inputCon1: {
    height: 75,
    justifyContent: 'center',
    flex: 1,
    color: '#000',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 7.5,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
    color: '#000',
  },
  selectText: {
    color: '#000',
    marginLeft: 15,
    fontSize: 15,
    textTransform: 'capitalize',
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#6c64ff',
  },
  name: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 10,
  },
  plan: {
    fontSize: 14,
    color: '#6c64ff',
    marginLeft: 10,
    marginTop: 3,
  },
  subTitle: {
    color: '#9d9d9d',
    fontSize: 14,
    marginHorizontal: 20,
    marginTop: 10,
  },
  btn: {
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6c64ff',
    marginTop: 20,
    marginHorizontal: 20,
  },
  btn1: {
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginTop: 15,
    marginHorizontal: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  modalCon: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  modalItemText: {
    color: '#000',
    fontSize: 15,
  },
  modalSep: {
    height: 1,
    backgroundColor: '#eee',
  },
});
