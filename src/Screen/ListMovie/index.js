import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "../../core-ui";
import { styles } from "./style";
import { Input, Spin, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import getMovie from "../../helper/getListMovie";

function ListMovie() {
    let dispatch = useDispatch();
    let [state, setState] = useState({
        search: 'Free',
        loading: false,
        page: 1,
        error: ''
    });
    let { search, loading, page, error } = state;
    let data = useSelector((state) => state.listData);
    let setLoading = (value) => setState((state) => ({
        ...state,
        loading: value,
    }));
    let getFilm = (search) => {
        console.log({ search })
        setLoading(true)
        getMovie({
            s: search,
            page: 1
        }).then((res) => {
            let error = res.data.Error
            if (error) {
                dispatch({
                    type: "DATA/ADD_DATA",
                    payload: [],
                });
                setState((state) => ({
                    ...state,
                    error
                }))
            } else {
                dispatch({
                    type: "DATA/ADD_DATA",
                    payload: res.data.Search || [],
                });
            }
            setState((state) => ({
                ...state,
                page: 1,
                loading: false,
            }));
        });
    }

    let getMoreFilm = (page) => {
        setLoading(true)
        getMovie({
            s: search,
            page: page + 1
        }).then((res) => {
            dispatch({
                type: "DATA/MORE_DATA",
                payload: res.data.Search || [],
            });
            setState((state) => ({
                ...state,
                page: page + 1,
                loading: false,
            }));
        }).catch((e) => console.log(e))
    }

    useEffect(() => {
        getFilm(search, page)
    }, [search]);

    const handleScroll = () => {
        const onBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (onBottom) {
            getMoreFilm(search, page)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <View style={styles.container}>
            <Text>Search Movie</Text>
            <Input
                value={search}
                onChange={(e) =>
                    setState((state) => ({ ...state, search: e.target.value }))
                }
            />
            <View style={styles.container}>
                {loading ? (
                    <Spin size="large" />
                ) : (!loading && data.length === 0 || data.length === 0 && error) ? (
                    <Empty description={error} />
                ) : (
                    <View style={styles.wrapperList}>
                        {data.map(({ Poster }, i) => {
                            return (
                                <TouchableOpacity key={i}>
                                    <img src={Poster} />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )}
            </View>
        </View>
    );
}

export default ListMovie;
