console.log('minh dep trai ko ai so 1');
//viet api phan quyen app benh nhan
const [menu, setMenu] = useState([]);
const [publicScreen, setPublicScreen] = useState([]);
const [tenmanhinh, setTenmanhinh] = useState('');
const [listmanhinh, setListmanhinh] = useState([]);
const [listappid, setListappid] = useState([]);
useEffect(() => {
    const fetchData = async() => {
        const response = await apiGetMenu(-1);
        const responsePublic = await apiGetMenu('http://localhost:7000/danhmucmanhinh?filter=isPublic||eq||1');
        const responseLinkLaToi =
            await apiGetMenu('http://localhost:7000/linkappbenhnhan?filter=sudung||eq||1&filter=loaiquanheId||eq||0&filter=appId||eq||40');
        if (response.success) {
            setMenu(response.data)
        }
        if (responsePublic.success) {
            setPublicScreen(response.data)
        }
        if (responseLinkLaToi.success) {
            setListappid(response.data)
        }
    }
}, [token]);

useEffect(() => {
    let choosePublic = publicScreen.find(
        (item) =>
        item.tenmanhinh === tenmanhinh,
    );
    if (choosePublic) {
        return true;
    }

    if (listappid.length > 0) {
        if (listmanhinh.length > 0 && tenmanhinh !== '') {
            let choose = listmanhinh.find(
                (item) =>
                item.tenmanhinh === tenmanhinh,
            );
            if (choose !== undefined) {
                return true;
            } else {
                navigationActions.goBack();
                setTenmanhinh('');
                Alert.alert('ban chua co quyen');
            }
        } else {
            return true;
        }
    }
    Alert.alert('ban chua co quyen');
    // if (listmanhinh.length > 0 && tenmanhinh !== '') {
    //     let choose = listmanhinh.find(
    //         (item) =>
    //         item.tenmanhinh === tenmanhinh,
    //     );
    //     if (choose !== undefined) {
    //         return true;
    //     } else {
    //         navigationActions.goBack();
    //         setTenmanhinh('');
    //         Alert.alert('ban chua co quyen');
    //     }
    // } else {
    //     return true;
    // }
}, [listmanhinh, tenmanhinh, publicScreen]);

// useEffect(() => {
//     if (publicScreen.length > 0 && tenmanhinh !== '') {
//         let choose = publicScreen.find(
//             (item) =>
//             item.tenmanhinh === tenmanhinh,
//         );
//         if (choose !== undefined) {
//             return true;
//         } else {
//             navigationActions.goBack();
//             setTenmanhinh('');
//             Alert.alert('ban chua co quyen');
//         }
//     } else {
//         return true;
//     }
// }, [publicScreen, tenmanhinh]);