import { useEffect, useState } from "react";
import Loading from "../../components/common/alert/Loading";
import { getDataAPI } from "../../utils/fetchData";
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { addProductToCart, CART_ACTION_TYPES, getCart } from "../../redux/actions/cartActions";
import { formatNumberWithCommas } from "../../utils/stringProcess";
import { IconButton } from "../../components/common";
import { followProduct, getFollowingProducts, PRODUCT_ACTION_TYPES, unfollowProduct } from "../../redux/actions/productActions";

const follwedProductStyle = "text-[#ff0000] hover:text-[#ff0000]"
const notFollwedProductStyle = "text-[#000000] hover:text-[#000000]"

const ProductDetail = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const followings = useSelector(state => state.product.following);

    const dispatch = useDispatch()
    const path = window.location.pathname.split('/').reverse()[0]


    useEffect(() => {
        if (auth.token) {
            dispatch(getCart(auth.token));
            dispatch(getFollowingProducts(auth.token));
        }
        else {
            dispatch({ type: CART_ACTION_TYPES.INIT_CART_ITEMS })
            dispatch({ type: PRODUCT_ACTION_TYPES.INIT_FOLLOWING_PRODUCTS })
        }
    }, [auth.token, dispatch]);

    useEffect(() => {
        if (!product) {
            setIsLoading(true);
            getDataAPI(`product/detail/${path}`)
                .then(res => {
                    setIsLoading(false);
                    if (res.status === 200) {
                        setProduct(res.data.product);
                    } else {
                        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: res.data.msg });
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                    dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: 'Có lỗi xảy ra khi lấy dữ liệu sản phẩm!' });
                });
        }
    }, [path, dispatch, product]);


    const isFollowing = followings?.find(following => following.product.id === product?.id)
    const followingStyle = isFollowing ? follwedProductStyle : notFollwedProductStyle

    const CustomMarkdown = ({ children }) => {
        return (<ReactMarkdown
            className='markdown p-[20px] bg-[#f5f8fd] text-[#777] overflow-y-auto outline-none text-[1rem]'
            children={children}
            components={{
                img: ({ node, ...props }) => {
                    return (<img {...props} style={{ maxWidth: '100%' }} alt={props.alt} />)
                },
                h2: ({ node, ...props }) => {
                    return (<h2 {...props} style={{ color: '#4d0406', fontWeight: 700 }} children={props.children} />)
                },
                h3: ({ node, ...props }) => {
                    return (<h3 {...props} style={{ color: '#4d0406', fontWeight: 700 }} children={props.children} />)
                },
                li: ({ node, ...props }) => {
                    return (<li {...props} style={{ userSelect: 'all' }} />)
                },
                p: ({ node, ...props }) => {
                    return (<p {...props} style={{}} />)
                },
            }}
        />)
    }

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncreaseQuantity = () => {
        if (quantity < product.quantity) {
            setQuantity(quantity + 1)
        }
    }

    const handleQuantityChange = (e) => {
        if (e.target.value === '') {
            setQuantity(1)
            return
        }
        const value = parseInt(e.target.value)
        if (value > product.quantity) {
            setQuantity(product.quantity)
        }
        else if (value < 1) {
            setQuantity(1)
        }
        else {
            setQuantity(value)
        }
    }

    const handleAddToCart = () => {
        if (auth.token) {
            dispatch(addProductToCart(product, quantity, auth.token))
        } else {
            if (cart.items.find(item => item.product.id === product.id)) {
                let newItems = Array.from(cart.items).map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
                dispatch({ type: CART_ACTION_TYPES.UPDATE_CART_ITEMS, payload: newItems })
            } else {
                dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: { product: product, quantity: quantity } })
                console.log({ product: product, quantity: quantity })
            }
        }
    }

    const handleFollowProduct = () => {
        if (!isFollowing) {
            if (auth.token) {
                dispatch(followProduct({ product, token: auth.token }))
            } else {
                dispatch({ type: PRODUCT_ACTION_TYPES.FOLLOW_PRODUCT, payload: { product } })
            }
        } else {
            if (auth.token) {
                dispatch(unfollowProduct({ product, token: auth.token }))
            } else {
                dispatch({ type: PRODUCT_ACTION_TYPES.UNFOLLOW_PRODUCT, payload: { product } })
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            {
                (isLoading && <Loading />) ||
                (product &&
                    (<div className="flex w-full md:w-[80%]">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full py-4 md:flex-row justify-between">
                                <img className="w-full md:w-[40%] md:max-h-[300px] object-contain p-2" src={product.imageUrl} alt={product.name} />
                                <div className="flex flex-col p-2">
                                    <h2 className="select-all">{product.name}</h2>
                                    <h4 className="text-[#a50a08]">{formatNumberWithCommas(product.price)} {product.currency}</h4>
                                    <p>{formatNumberWithCommas(product.quantity)} sản phẩm có sẵn</p>

                                    <div className="flex">
                                        <div className={"mb-2 flex p-2 cursor-pointer"}
                                            onClick={handleFollowProduct}
                                        >
                                            <IconButton
                                                iconClassName="fas fa-heart"
                                                className={followingStyle}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center mb-[2]">
                                        <div className="decrease-button cursor-pointer" onClick={handleDecreaseQuantity}>
                                            <i className="fas fa-minus"></i>
                                        </div>
                                        <input className="quantity-input w-8 outline-0 border-none text-center" value={quantity} onChange={(e) => handleQuantityChange(e)} />
                                        <div className="increase-button cursor-pointer" onClick={handleIncreaseQuantity}>
                                            <i className="fas fa-plus"></i>
                                        </div>
                                    </div>
                                    <div className="mb-2 flex">
                                        <span className="mr-2">Tổng tiền:</span>
                                        <span>{formatNumberWithCommas(product.price * quantity)} {product.currency}</span>
                                    </div>
                                    <div className="actions flex justify-between">
                                        <button className="btn btn-primary w-[40%] min-w-[120px]">Mua ngay</button>
                                        <button className="btn btn-primary w-[40%] min-w-[120px]"
                                            onClick={handleAddToCart}
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-auto mr-auto px-2 bg-[#f5f8fd]"> Mô tả </div>
                            <CustomMarkdown children={product?.detail} />
                        </div>
                    </div>
                    )
                )
            }
        </div>
    )
}

export default ProductDetail;