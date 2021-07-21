import images from "res/images";
import { CommonScreen } from "routers/screenName";
import { MenuProps } from "./ExpandableViewSeparate";

//You can also use dynamic data by calling webservice
export const dataPartner: MenuProps[] = [
    {
        isExpanded: false,
        category_name: 'Thông tin cá nhân',
        isSubMenu: false,
        icon: images.ic_my_profile,
        route: CommonScreen.ProfileScreen,
    },
    {
        isExpanded: false,
        category_name: 'Công việc',
        subcategory: [
            { id: 1, value: 'Hồ sơ đã nhận', route: CommonScreen.ReceivedCvScreen },
            { id: 2, value: 'Danh sách đăng tuyển', route: CommonScreen.ListJobScreen },
            { id: 3, value: 'Đề nghị phỏng vấn', route: CommonScreen.ReceivedJobScreen },
            { id: 4, value: 'Quản lý lịch phỏng vấn', route: CommonScreen.ReceivedJobScreen },
            { id: 5, value: 'Tạo công việc', route: CommonScreen.CreateJobScreen },
        ],
        isSubMenu: true,
        icon: images.ic_job,
    },
]
export const dataUser: MenuProps[] = [
    {
        isExpanded: false,
        category_name: 'Thông tin cá nhân',
        isSubMenu: false,
        icon: images.ic_my_profile,
        route: CommonScreen.EditProfileScreen,
    },
    {
        isExpanded: false,
        category_name: 'Công việc',
        subcategory: [
            { id: 1, value: 'Danh sách công việc', route: CommonScreen.JobScreen },
            { id: 2, value: 'Hồ sơ đã gửi', route: CommonScreen.ListSubmittedProfileScreen },
        ],
        isSubMenu: true,
        icon: images.ic_job,
    },
]
const CONTENT: MenuProps[] = [
    {
        isExpanded: false,
        category_name: 'Trang chủ',
        isSubMenu: false,
        icon: images.ic_home,
        route: CommonScreen.Home,
    },
];
export default CONTENT