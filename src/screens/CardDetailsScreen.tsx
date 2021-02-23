import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {RootState} from '../store/store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IComment} from '../utils/interfaces';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sagaCardActions} from '../store/card/actions';
import {sagaCommentActions} from '../store/comment/actions';

type Props = {
  comment: IComment;
};

const CommentItem: React.FC<Props> = ({comment}) => {
  const [state, setState] = useState({
    onEdit: false,
    body: comment.body,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({...state, body: comment.body}));
  }, [comment]);

  const deleteComment = () => {
    dispatch({
      type: sagaCommentActions.DELETE_COMMENT_SAGA,
      payload: {commentId: comment.id},
    });
    setTimeout(() => {
      dispatch({type: sagaCardActions.GET_CARDS_SAGA});
      dispatch({type: sagaCommentActions.GET_COMMENTS_SAGA});
    }, 500);
  };

  const editComment = () => {
    dispatch({
      type: sagaCommentActions.EDIT_COMMENT_SAGA,
      payload: {commentId: comment.id, body: state.body},
    });

    setTimeout(() => {
      dispatch({type: sagaCardActions.GET_CARDS_SAGA});
      dispatch({type: sagaCommentActions.GET_COMMENTS_SAGA});
      setState({onEdit: false, body: comment.body});
    }, 500);
  };

  const renderComment = () => (
    <View style={styles.commentBody}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.commentAvatar}></View>
        <Text>
          {comment.body}
          {state.onEdit && 'edit'}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.editComment}
          onPress={() =>
            setState((state) => ({...state, onEdit: !state.onEdit}))
          }>
          <Text style={{color: 'white'}}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delComment} onPress={deleteComment}>
          <Text style={{color: 'white'}}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderEditComment = () => (
    <View style={styles.commentBody}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.commentAvatar}></View>
        <TextInput
          style={styles.inputComment}
          defaultValue={comment.body}
          onChangeText={(text) => setState((state) => ({...state, body: text}))}
          value={state.body}></TextInput>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={styles.editComment} onPress={editComment}>
          <Text style={{color: 'white'}}>DONE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delComment}
          onPress={() => setState((state) => ({...state, onEdit: false}))}>
          <Text style={{color: 'white'}}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return <>{state.onEdit ? renderEditComment() : renderComment()}</>;
};

const CardDetailsScreen: React.FC = ({navigation, route}: any) => {
  const [card] = useSelector((state: RootState) =>
    state.cardsStore.cards.filter((item) => item.id === route.params.cardId),
  );
  const comments = useSelector(
    (state: RootState) => state.commentsStore.comments,
  );
  const currentCardComments = comments.filter((item) =>
    card.commentsIds.includes(item.id),
  );
  const dispatch = useDispatch();
  const [state, setState] = useState({
    body: '',
  });

  const commentSubmit = () => {
    dispatch({
      type: sagaCommentActions.CREATE_COMMENT_SAGA,
      payload: {cardId: card.id, body: state.body},
    });

    setTimeout(() => {
      dispatch({type: sagaCardActions.GET_CARDS_SAGA});
      dispatch({type: sagaCommentActions.GET_COMMENTS_SAGA});
      setState((state) => ({...state, body: ''}));
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{card.title}</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.text}>{card.description}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => navigation.navigate('CardEdit', card)}>
          <Text style={{color: 'white'}}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => navigation.navigate('CardDelete', card)}>
          <Text style={{color: 'white'}}>DELETE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentsBar}>
        <Text style={styles.commentsTitle}>COMMENTS</Text>
      </View>
      {currentCardComments.map((item: IComment, i: number) => (
        <CommentItem comment={item} key={i} />
      ))}
      <View style={styles.addComment}>
        <Icon
          name="comment-o"
          size={20}
          color="#BFB393"
          style={{marginRight: 4}}
        />
        <TextInput
          placeholder="Add a comment..."
          onChangeText={(text) => setState((state) => ({...state, body: text}))}
          value={state.body}
          onSubmitEditing={commentSubmit}></TextInput>
      </View>
    </View>
  );
};

export default CardDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  title: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 13,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#E5E5E5',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'SF UI Text',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 17,
    fontFamily: 'SF UI Text',
  },
  verticalStripe: {
    width: 3,
    height: 24,
    backgroundColor: '#72A8BC',
    borderRadius: 50,
    marginRight: 10,
  },
  description: {
    padding: 13,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#E5E5E5',
  },
  buttons: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#E5E5E5',
  },
  buttonEdit: {
    height: '100%',
    width: 200,
    backgroundColor: '#72A8BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDelete: {
    height: '100%',
    width: 200,
    backgroundColor: '#AC5253',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentsBar: {
    height: 50,
    paddingLeft: 13,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsTitle: {
    fontSize: 13,
    fontFamily: 'SF UI Text',
    color: '#72A8BC',
  },
  commentBody: {
    height: 74,
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentAvatar: {
    borderRadius: 50,
    backgroundColor: '#BFB393',
    width: 46,
    height: 46,
    marginRight: 9,
  },
  addComment: {
    paddingLeft: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editComment: {
    backgroundColor: '#72A8BC',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  inputComment: {
    minWidth: 200,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    borderColor: '#e5e5e5',
  },
  delComment: {
    backgroundColor: '#AC5253',
    height: '100%',
    justifyContent: 'center',
    padding: 5,
  },
});
