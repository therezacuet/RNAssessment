import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "../components/button-component";
import Spacer from "../components/spacer";
import { Answer, values } from "../constants/values";
import { QuestionStatus } from "../enums/status";
import { RootStackParamList, RouteParams } from "../navigations/data";
import { colors, deviceFontFamily, size } from "../styles/global-styles";
import { Question } from "../interfaces/question";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { loadQuestions } from "../redux/actions/question-actions";

const SCREEN_WIDTH = Dimensions.get("screen").width;

interface HomeScreenProps {
    navigation: StackNavigationProp<RootStackParamList>;
    route: RouteProp<RootStackParamList, RouteParams.HOME>;
}


interface QuestionProps {
    item: Question
}

const HomeScreen: React.FC<HomeScreenProps> = (props) => {

    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList<any>>();
    const [status, setStatus] = useState<QuestionStatus>(QuestionStatus.NOT_ATTEMPT);
    const state = useSelector((state: any) => state.questionReducer);
    const questions: Question[] = state.questions;
    const [answer, setAnswer] = useState<Answer>();


    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion = () => {
        dispatch(loadQuestions());
    }

    const handleOnPress = () => {
        if (answer !== undefined && status === QuestionStatus.NOT_ATTEMPT) {
            checkAnswer();
        }
        else if (activeIndex === (questions.length - 1)) {
            handleFinish();
        }
        else {
            gotoNextQuestion();
        }
    }

    const handleFinish = () => {
        loadQuestion();
        setAnswer(undefined);
        setStatus(QuestionStatus.NOT_ATTEMPT);
        setActiveIndex(0);
        flatListRef.current?.scrollToIndex({ index: 0, animated: true })
    }

    const gotoNextQuestion = () => {
        let nextIndex = (questions.length - 1) > activeIndex ? activeIndex + 1 : activeIndex;
        flatListRef.current?.scrollToIndex({ index: nextIndex });
        if (nextIndex !== activeIndex) {
            setAnswer(undefined);
            setStatus(QuestionStatus.NOT_ATTEMPT);
        }
        setActiveIndex(nextIndex);
    }

    const checkAnswer = () => {
        setStatus(answer?.correct ? QuestionStatus.CORRECT : QuestionStatus.WRONG);
    }

    const buttonTitle = (): string => {
        let title = values.continue;
        if (answer !== undefined && status === QuestionStatus.NOT_ATTEMPT) {
            title = values.checkAnswer;
        }
        else if (answer !== undefined && status !== QuestionStatus.NOT_ATTEMPT && activeIndex === (questions.length - 1)) {
            title = values.finish;
        }
        return title;
    }

    const buttonBgColor = () => {
        let bgColor = colors.white;
        if (answer === undefined && status === QuestionStatus.NOT_ATTEMPT) {
            bgColor = colors.lightGrey;
        }
        else if (answer !== undefined && status === QuestionStatus.NOT_ATTEMPT) {
            bgColor = colors.lightBlue;
        }

        return bgColor;
    }

    const bottomContainerBgColor = () => {
        let bgColor = colors.ming;
        if (status === QuestionStatus.CORRECT) {
            bgColor = colors.lightBlue;
        }
        else if (status === QuestionStatus.WRONG) {
            bgColor = colors.lightRed;
        }
        return bgColor;
    }

    const btnTextColor = () => {
        let textColor = colors.white;
        if (status === QuestionStatus.CORRECT) {
            textColor = colors.lightBlue;
        }
        else if (status === QuestionStatus.WRONG) {
            textColor = colors.lightRed;
        }

        return textColor;
    }

    const resultMessage = () => {
        let message = '';
        if (answer?.correct) {
            message = values.successMessage;
        }
        else {
            let correctAnswer = questions[activeIndex].answer.find(answer => answer.correct!);
            message = values.answer + ": " + correctAnswer?.text;
        }
        return message;
    }

    const QuestionItem: React.FC<QuestionProps> = ({ item }) => React.useMemo(() => {
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.title}>{item.hint}</Text>
                <Spacer height={size.s16} />
                <Text style={styles.title}>{item.question_title.replace("?", item.givenAnswer === undefined ? "_________" : item.givenAnswer.text)}</Text>
                <Spacer height={size.s32} />

                <FlatList
                    data={item.answer}
                    renderItem={(innerItem) =>
                        <View style={{ minWidth: size.s128, margin: size.s8 }}>
                            <Button
                                textColor={colors.black}
                                btnBgColor={innerItem.item.text === item.givenAnswer?.text ? colors.lightGrey : colors.white}
                                title={innerItem.item.text === item.givenAnswer?.text ? "" : innerItem.item.text}
                                onPress={() => {
                                    if (status === QuestionStatus.NOT_ATTEMPT) {
                                        item.givenAnswer = innerItem.item;
                                        setAnswer(innerItem.item);
                                    }
                                }} />
                        </View>
                    }
                    keyExtractor={(innerItem) => innerItem.id}
                    numColumns={2}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingVertical: 20, flexGrow: 1 }}
                />
            </View>
        );
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ height: 150, backgroundColor: colors.skyBlue }}>

            </View>

            <View style={styles.centerContentContainer}>
                <Text style={styles.title}>{values.hint}</Text>
                <Spacer height={size.s24} />
                {
                    state.isFetchingRequest ? <ActivityIndicator size={'large'} /> :
                        <FlatList
                            ref={flatListRef}
                            data={questions}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) => <QuestionItem item={item} />}
                            horizontal
                            contentContainerStyle={{ flexGrow: 1 }}
                            scrollEnabled={false}
                            pagingEnabled={true}
                            legacyImplementation={false}
                        />
                }

            </View>

            <View style={{ backgroundColor: colors.ming }}>
                <View style={{
                    ...styles.bottomContainer,
                    backgroundColor: bottomContainerBgColor(),
                    borderTopLeftRadius: status === QuestionStatus.NOT_ATTEMPT ? 0 : size.s24,
                    borderTopRightRadius: status === QuestionStatus.NOT_ATTEMPT ? 0 : size.s24,
                }}>
                    {status !== QuestionStatus.NOT_ATTEMPT ?
                        <View style={styles.resultMessageContainer}>
                            <Text style={styles.title}>{resultMessage()}</Text>
                            <Icon name="flag" size={size.s16} color={colors.white} />
                        </View> : <></>
                    }
                    <Spacer height={size.s16} />
                    <Button
                        title={buttonTitle()}
                        onPress={handleOnPress}
                        btnBgColor={buttonBgColor()}
                        textColor={btnTextColor()}
                    />
                </View>
            </View>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: colors.skyBlue
    },
    bottomContainer: {
        height: 200,
        padding: size.s32,
    },

    centerContentContainer: {
        flex: 1,
        backgroundColor: colors.ming,
        borderTopLeftRadius: size.s24,
        borderTopRightRadius: size.s24,
        padding: size.s24
    },
    title: {
        alignSelf: 'center',
        fontFamily: deviceFontFamily,
        color: colors.white,
        fontSize: 18
    },
    resultMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    questionContainer: {
        width: SCREEN_WIDTH - 50,
        height: 'auto',
        alignItems: 'center',
        alignContent: 'center'
    }

})