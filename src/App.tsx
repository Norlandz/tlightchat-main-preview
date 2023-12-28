import React from 'react';
import { LoginButton } from './user/LoginButton';
import { LogoutButton } from './user/LogoutButton';
import { UserProfileOthers, UserProfileSelf, UserProfileSimple } from './user/UserProfile';
import { App_WebrtcVideoCommunication_connectToServer } from './webrtcVideoCommunication/App_WebrtcVideoCommunication_connectToServer';
import styles from './scss/index.module.css';
import { BrowserRouter, Link, NavLink as RouterLink, Route, Routes } from 'react-router-dom';
import { Home } from './homeViewPage/Home';
import { About } from './homeViewPage/About';
// import { Navbar, Nav, Container, Col, Row, NavDropdown } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import SidebarMenu from 'react-bootstrap-sidebar-menu';
// import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBCollapse, MDBRipple, MDBBadge, MDBInput, MDBListGroup, MDBListGroupItem, } from 'mdb-react-ui-kit';
// "mdb-react-ui-kit": "^7.0.0",
// "react-bootstrap-sidebar-menu": "^2.0.3",
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  IconButton,
  Snackbar,
  Button,
  ThemeProvider,
  createTheme,
} from '@mui/material';
// import { createTheme } from '@mui/material/styles';
import { CollapseAuto } from './utilComponent/materialui/CollapseAuto';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import { makeStyles } from '@mui/material';
// import styled from 'styled-components';
// import makeStyles from '@mui/styles';

// import { CSSObject, ThemeProvider, createTheme, styled } from '@mui/system';
import { ViewSidebar } from '@mui/icons-material';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DuoIcon from '@mui/icons-material/Duo';
// import { Textfit } from 'react-textfit';

// // ;wrong not_here; import 'bootstrap/dist/css/bootstrap.css';
// // ;wrong not_here; import 'bootstrap/scss/bootstrap.scss';
// import './scss/custom.scss';
// // ;wrong not_here; import 'react-bootstrap-sidebar-menu/dist/sidebar-menu.scss';
// // import './SideBar.module.css';
// // import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// // import '@fortawesome/fontawesome-free/css/all.min.css';

// ;trytest; const router = createBrowserRouter([
// ;trytest;   {
// ;trytest;     path: '/',
// ;trytest;     element: <div>Route Root</div>,
// ;trytest;     errorElement: <ErrorPage />,
// ;trytest;   },
// ;trytest;   {
// ;trytest;     path: 'contacts/:contactId',
// ;trytest;     element: <div>Route Contact</div>,
// ;trytest;   },
// ;trytest; ]);
// <RouterProvider router={router} />

// Navbar Bootstrap 5 | Bootstrap Navbar Tutorial - YouTube
// https://www.youtube.com/watch?v=qNifU_aQRio
// Responsive Navbar using React, React BootStrap and React Router Dom - YouTube
// https://www.youtube.com/watch?v=t4Zax3c2TuI
// Download · Bootstrap
// https://getbootstrap.com/docs/4.0/getting-started/download/
// Introduction | React Bootstrap
// https://react-bootstrap.netlify.app/docs/getting-started/introduction

// const NavigationPanel: React.FC = () => (@¦  <nav className={styles.css_borderSimple}>@¦    <ul>@¦      <li>@¦        <NavLink to="/">Home</NavLink>@¦      </li>@¦      <li>@¦        <NavLink to="/About">About</NavLink>@¦      </li>@¦      <li>@¦        <NavLink to="/WebrtcVideoCommunication">WebrtcVideoCommunication</NavLink>@¦      </li>@¦      <li>@¦        <NavLink to="/users/1">User 1</NavLink>@¦      </li>@¦      <li>@¦        <NavLink to="/users/2">User 2</NavLink>@¦      </li>@¦      <li>@¦        <NavLink to="/activities">Activities</NavLink>@¦      </li>@¦      <li>@¦        <NavLink to="/activities/played">Played</NavLink>@¦      </li>@¦      <li>@¦        <NavLink to="/activities/published">Published</NavLink>@¦      </li>@¦    </ul>@¦  </nav>@¦);

//no_knowlres <Nav.Link as={Link} to={{ no offical explain; but talked scattered in diff StackOverflow posts & those many ways ..
// Codeium says as / other wrap in Nav.Item
// LinkContainer medium
// well can guess not Related to ReactRouter but just a simple <a> .. though no confirm ..
// it does work with as ..

// html - Make a sidebar from react-bootstrap - Stack Overflow
// https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
// https://react-bootstrap.netlify.app/docs/components/navbar/#home
// <Nav defaultActiveKey="/" className={styles.css_borderSimple}>

// How to create a responsive React Bootstrap sidebar with Contrast.
// https://www.devwares.com/blog/create-responsive-sidebar-in-react/
//
// Sidebar Component for React Bootstrap 5
// https://www.devwares.com/docs/contrast/react/navigation/sidebar/
//
// Devwares-Team/cdbreact: Contrast Design Bootstrap : Elegant UI Kit and reusable components for building mobile-first, responsive websites and web apps
// https://github.com/Devwares-Team/cdbreact

// mdbootstrap/mdb-react-ui-kit: React 17 & Bootstrap 5 & Material Design 2.0 UI KIT
// https://github.com/mdbootstrap/mdb-react-ui-kit?tab=readme-ov-file#readme
//
// Bootstrap Sidebar - free examples, templates & tutorial
// https://mdbootstrap.com/docs/react/extended/sidebar/

// ;M boostrap StackOverflow manual vertical; const NavigationPanel_prime: React.FC = () => {
// ;M boostrap StackOverflow manual vertical;   const jsx_NavLink = (
// ;M boostrap StackOverflow manual vertical;     <>
// ;M boostrap StackOverflow manual vertical;       <Nav.Link as={Link} to="/">Home</Nav.Link>
// ;M boostrap StackOverflow manual vertical;       <Nav.Link as={Link} to="/About">About</Nav.Link>
// ;M boostrap StackOverflow manual vertical;       <Nav.Link as={Link} to="/WebrtcVideoCommunication">WebrtcVideoCommunication</Nav.Link>
// ;M boostrap StackOverflow manual vertical;       <Nav.Link as={Link} to="/users/1">User 1</Nav.Link>
// ;M boostrap StackOverflow manual vertical;       <Nav.Link as={Link} to="/users/2">User 2</Nav.Link>
// ;M boostrap StackOverflow manual vertical;       <Nav.Link as={Link} to="/activities">Activities</Nav.Link>
// ;M boostrap StackOverflow manual vertical;       <Nav.Link as={Link} to="/activities/played">Played</Nav.Link>
// ;M boostrap StackOverflow manual vertical;       <Nav.Link as={Link} to="/activities/published">Published</Nav.Link>
// ;M boostrap StackOverflow manual vertical;     </>
// ;M boostrap StackOverflow manual vertical;   ); // prettier-ignore
// ;M boostrap StackOverflow manual vertical;
// ;M boostrap StackOverflow manual vertical;   return (
// ;M boostrap StackOverflow manual vertical;     <Navbar bg="dark" data-bs-theme="dark">
// ;M boostrap StackOverflow manual vertical;       <Container>
// ;M boostrap StackOverflow manual vertical;         <Navbar.Brand href="#home">NavPanel</Navbar.Brand>
// ;M boostrap StackOverflow manual vertical;         {/* <Nav className="me-auto">{jsx_NavLink}</Nav> */}
// ;M boostrap StackOverflow manual vertical;         <Nav className="col-md-12 d-none d-md-block bg-black  sidebar" activeKey="/">{jsx_NavLink}</Nav>
// ;M boostrap StackOverflow manual vertical;       </Container>
// ;M boostrap StackOverflow manual vertical;     </Navbar>
// ;M boostrap StackOverflow manual vertical;   );
// ;M boostrap StackOverflow manual vertical; };
// ;M boostrap StackOverflow manual vertical;
// ;M boostrap StackOverflow manual vertical; const NavigationPanel: React.FC = () => {
// ;M boostrap StackOverflow manual vertical;   return (
// ;M boostrap StackOverflow manual vertical;     <Container fluid>
// ;M boostrap StackOverflow manual vertical;       <Row>
// ;M boostrap StackOverflow manual vertical;         <Col xs={2} id="sidebar-wrapper">
// ;M boostrap StackOverflow manual vertical;           <NavigationPanel_prime />
// ;M boostrap StackOverflow manual vertical;         </Col>
// ;M boostrap StackOverflow manual vertical;         <Col xs={10} id="page-content-wrapper">
// ;M boostrap StackOverflow manual vertical;           this is a test
// ;M boostrap StackOverflow manual vertical;         </Col>
// ;M boostrap StackOverflow manual vertical;       </Row>
// ;M boostrap StackOverflow manual vertical;     </Container>
// ;M boostrap StackOverflow manual vertical;   );
// ;M boostrap StackOverflow manual vertical; };

// ;M boostrap horizontal; const NavigationPanel: React.FC = () => {
// ;M boostrap horizontal;   const jsx_NavLink = (
// ;M boostrap horizontal;     <>
// ;M boostrap horizontal;       <Nav.Link as={Link} to="/">Home</Nav.Link>
// ;M boostrap horizontal;       <Nav.Link as={Link} to="/About">About</Nav.Link>
// ;M boostrap horizontal;       <Nav.Link as={Link} to="/WebrtcVideoCommunication">WebrtcVideoCommunication</Nav.Link>
// ;M boostrap horizontal;       <NavDropdown title="users">
// ;M boostrap horizontal;         <Nav.Link as={Link} to="/users/1">User 1</Nav.Link>
// ;M boostrap horizontal;         <Nav.Link as={Link} to="/users/2">User 2</Nav.Link>
// ;M boostrap horizontal;       </NavDropdown>
// ;M boostrap horizontal;       <NavDropdown title="activities">
// ;M boostrap horizontal;         <Nav.Link as={Link} to="/activities">Activities</Nav.Link>
// ;M boostrap horizontal;         <Nav.Link as={Link} to="/activities/played">Played</Nav.Link>
// ;M boostrap horizontal;         <Nav.Link as={Link} to="/activities/published">Published</Nav.Link>
// ;M boostrap horizontal;       </NavDropdown>
// ;M boostrap horizontal;     </>
// ;M boostrap horizontal;   ); // prettier-ignore
// ;M boostrap horizontal;
// ;M boostrap horizontal;   return (
// ;M boostrap horizontal;     <Navbar
// ;M boostrap horizontal;       bg="dark"
// ;M boostrap horizontal;       data-bs-theme="dark"
// ;M boostrap horizontal;       collapseOnSelect
// ;M boostrap horizontal;       expand="lg"
// ;M boostrap horizontal;       className="bg-body-tertiary"
// ;M boostrap horizontal;       // className="navbar-light"
// ;M boostrap horizontal;     >
// ;M boostrap horizontal;       <Container>
// ;M boostrap horizontal;         <Navbar.Brand href="#home">NavPanel</Navbar.Brand>
// ;M boostrap horizontal;         <Navbar.Toggle aria-controls="responsive-navbar-nav">Toggle</Navbar.Toggle>
// ;M boostrap horizontal;         <Navbar.Collapse id="responsive-navbar-nav">
// ;M boostrap horizontal;           <Nav className="bg-black" activeKey="/">
// ;M boostrap horizontal;             {jsx_NavLink}
// ;M boostrap horizontal;           </Nav>
// ;M boostrap horizontal;         </Navbar.Collapse>
// ;M boostrap horizontal;       </Container>
// ;M boostrap horizontal;     </Navbar>
// ;M boostrap horizontal;   );
// ;M boostrap horizontal; };

// ;M boostrap SidebarMenu;     <SidebarMenu>

// ;styled RouterLink 1; // <MuiLink component={Link} to="/About">About</MuiLink>
// ;styled RouterLink 1; // <ListItem><NavLink to="/About">About</NavLink></ListItem>
// ;styled RouterLink 1; // <ListItem><MuiLink component={RouterLink} to="/About">About</MuiLink></ListItem>
// ;styled RouterLink 1;
// ;styled RouterLink 1; // []
// ;styled RouterLink 1; // From MUI Documentation:
// ;styled RouterLink 1; //
// ;styled RouterLink 1; // If you are using the styled() utility (regardless of whether it comes from @mui/material or @emotion/styled), you will need to cast the resulting component as shown below:
// ;styled RouterLink 1; //
// ;styled RouterLink 1; // import { styled } from '@mui/material/styles';
// ;styled RouterLink 1; //
// ;styled RouterLink 1; // const CustomButton = styled(Button)({
// ;styled RouterLink 1; //   // your custom styles go here
// ;styled RouterLink 1; // }) as typeof Button;
// ;styled RouterLink 1; // <>
// ;styled RouterLink 1; // https://github.com/mui/material-ui/issues/34033
// ;styled RouterLink 1; let RouterLinkStyled = RouterLink;
// ;styled RouterLink 1;
// ;styled RouterLink 1; // RouterLinkStyled.defaultProps = {
// ;styled RouterLink 1; //   className: ({ isActive }) => {
// ;styled RouterLink 1; //     console.log('zzzz');
// ;styled RouterLink 1; //     return isActive ? 'active' : '';
// ;styled RouterLink 1; //   },
// ;styled RouterLink 1; // };
// ;styled RouterLink 1;
// ;styled RouterLink 1; RouterLinkStyled = styled(RouterLinkStyled)({
// ;styled RouterLink 1;   color: 'inherit',
// ;styled RouterLink 1;   fontFamily: 'Roboto',
// ;styled RouterLink 1; }) as unknown as typeof RouterLink;
// ;styled RouterLink 1;
// ;styled RouterLink 1; const jsx_List = (
// ;styled RouterLink 1;   <List sx={{ fontFamily: 'Roboto' }}>
// ;styled RouterLink 1;     <ListItem component={RouterLinkStyled} to="/">Home</ListItem>
// ;styled RouterLink 1;     <ListItem component={RouterLinkStyled} to="/About">About</ListItem>
// ;styled RouterLink 1;     <Divider />
// ;styled RouterLink 1;     <ListItem component={RouterLinkStyled} to="/WebrtcVideoCommunication">WebrtcVideoCommunication</ListItem>
// ;styled RouterLink 1;     <Divider />
// ;styled RouterLink 1;     <ListItem>
// ;styled RouterLink 1;       <List>
// ;styled RouterLink 1;         <CollapseAuto title={<Box component="span">Users</Box>}>
// ;styled RouterLink 1;           <ListItem component={RouterLinkStyled} to="/users/1">User_1</ListItem>
// ;styled RouterLink 1;           <ListItem component={RouterLinkStyled} to="/users/2">User_2</ListItem>
// ;styled RouterLink 1;         </CollapseAuto>
// ;styled RouterLink 1;       </List>
// ;styled RouterLink 1;     </ListItem>
// ;styled RouterLink 1;     <Divider />
// ;styled RouterLink 1;     <ListItem component={RouterLinkStyled} to="/activities">Activities</ListItem>
// ;styled RouterLink 1;     <ListItem component={RouterLinkStyled} to="/activities/played">Played</ListItem>
// ;styled RouterLink 1;     <ListItem component={RouterLinkStyled} to="/activities/published">Published</ListItem>
// ;styled RouterLink 1;   </List>
// ;styled RouterLink 1; ); // prettier-ignore

// ;2; // []
// ;2; // import { NavLink as NavLinkBase } from 'react-router-dom';
// ;2; //
// ;2; // const NavLink = React.forwardRef((props, ref) => (
// ;2; //   <NavLinkBase
// ;2; //     ref={ref}
// ;2; //     {...props}
// ;2; //     className={props.activeClassName}
// ;2; //   />
// ;2; // ));
// ;2; // <>
// ;2; // https://stackoverflow.com/questions/71350481/react-router-dom-v6-navlink-and-mui-listitem-not-working-with-classname
// ;2;
// ;2; // // let RouterLinkStyled = RouterLink;
// ;2; // const RouterLinkStyled: typeof RouterLink = React.forwardRef((props, ref) => (
// ;2; //   <RouterLink
// ;2; //     ref={ref}
// ;2; //     {...props}
// ;2; //     style={({ isActive }) => ({
// ;2; //       fontFamily: 'Roboto',
// ;2; //       color: 'inherit',
// ;2; //       textDecoration: 'inherit',
// ;2; //       fontWeight: isActive ? 700 : 'inherit',
// ;2; //       // display: 'inline-block',
// ;2; //     })}
// ;2; //   />
// ;2; // ));
// ;2;
// ;2;   // const jsx_List = (
// ;2;   //   <List sx={{ fontFamily: 'Roboto' }}>
// ;2;   //     <ListItem component={RouterLinkStyled} to="/">Home</ListItem>
// ;2;   //     <ListItem component={RouterLinkStyled} to="/About">About</ListItem>
// ;2;   //     <Divider />
// ;2;   //     <ListItem component={RouterLinkStyled} to="/WebrtcVideoCommunication">WebrtcVideoCommunication</ListItem>
// ;2;   //     <Divider />
// ;2;   //     <ListItem>
// ;2;   //       <List>
// ;2;   //         <CollapseAuto title={<RouterLinkStyled to="/users">Users</RouterLinkStyled>}>
// ;2;   //           <ListItem component={RouterLinkStyled} to="/users/self">User_self</ListItem>
// ;2;   //           <ListItem component={RouterLinkStyled} to="/users/1">User_1</ListItem>
// ;2;   //           <ListItem component={RouterLinkStyled} to="/users/2">User_2</ListItem>
// ;2;   //         </CollapseAuto>
// ;2;   //       </List>
// ;2;   //     </ListItem>
// ;2;   //     <Divider />
// ;2;   //     <ListItem component={RouterLinkStyled} to="/activities">Activities</ListItem>
// ;2;   //     <ListItem component={RouterLinkStyled} to="/activities/played">Played</ListItem>
// ;2;   //     <ListItem component={RouterLinkStyled} to="/activities/published">Published</ListItem>
// ;2;   //   </List>
// ;2;   // ); // prettier-ignore

// []
// Next, use the [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/@container) at-rule to define a container query. The query in the following example will apply styles to elements based on the size of the nearest ancestor with a containment context.
// <>
// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries
// css - Font scaling based on size of container - Stack Overflow
// https://stackoverflow.com/questions/16056591/font-scaling-based-on-size-of-container

// []
// type ViewProps = React.ComponentProps<typeof View>
// <>
// https://stackoverflow.com/questions/43230765/typescript-react-access-component-property-types
type RouterLinkProps = React.ComponentProps<typeof RouterLink>;
//    <>{children}</> .. ok just need wrap ...
// const RouterLinkStyled = React.forwardRef<typeof RouterLink, RouterLinkProps>((props, ref) => {
// ;waste time[container query cant get width for fitcontent; other css dk; just use js...];  //     <Box@¦//       sx={{@¦//         width: '200px',@¦//         containerType: 'inline-size',@¦//         resize: 'both',@¦//         overflow: 'scroll',@¦//@¦//         '& .MuiBox-root': {@¦//           // fontSize: '5cqw',@¦//           // fontSize: '5vb',@¦//           // fontSize: '15px',@¦//           // fontSize: '1em',@¦//         },@¦//       }}@¦//     >@¦//       <Box>0123456789</Box>@¦//       <Box>01234567890123456789</Box>@¦//     </Box>@¦@¦//     <Box@¦//       sx={{@¦//         width: '100px',@¦//         // display: 'flex',@¦//         direction: 'column',@¦//         resize: 'both',@¦//         overflow: 'scroll',@¦//         position: 'relative',@¦//       }}@¦//     >@¦//       <Box@¦//         sx={{@¦//           containerType: 'inline-size',@¦//           '& .MuiBox-root': {@¦//             fontSize: 'min(15px, 8cqw)',@¦//           },@¦//         }}@¦//       >@¦//         <Box >abcdef</Box>@¦//       </Box>@¦@¦// idk what miss there ,@¦// but say is 1. js logic simple 1. or css think of percentage , dk waht say about fontsize, but the length cannot get@¦// rest just say dont waste time rethink & drop ( cuz [[ well that was the fck life had@¦@¦// https://youtu.be/rrLAg7xNERA?t=345@¦// container-type: size -> container determine the height -> but you didnt put a height in container -> height is 0 ...@¦// (height normally determine by children inside the container@¦// default is viewport if no container@¦// purple to show container@¦// well that use parent as container@¦@¦//     <Box@¦//       className="global_sidebar"@¦//       sx={{@¦//         width: '200px',@¦//         resize: 'both',@¦//         overflow: 'scroll',@¦//         position: 'relative',@¦//@¦//         border: '2px solid rgba(0, 0, 255, 0.5)',@¦//         padding: '2em',@¦//       }}@¦//     >@¦//       <Box@¦//         className="fixed_width"@¦//         sx={{@¦//           // width: '100%',@¦//           border: '4px solid rgba(0, 255, 0, 0.5)',@¦//           containerType: 'inline-size',@¦//           containerName: 'ct_fixed_width',@¦//@¦//           '@container ct_fixed_width (min-width: 500px)': {@¦//             backgroundColor: 'rgba(0, 255, 255, 0.5)',@¦//           },@¦//         }}@¦//       >@¦//         <Box@¦//           sx={{@¦//             width: 'fit-content',@¦//             // width: 'auto',@¦//             containerType: 'inline-size',@¦            // containerType: 'normal', // for width: 'fit-content' must use containerType: 'normal' // if use normal ... it cannot get size only style ...@¦            // seems span can bypass the use of 'fit-content' ...  // though border shows, the query doesnt show anything ...@¦//             containerName: 'ct_get_width_from_this',@¦//@¦//             border: '2px dashed rgba(255, 0, 0, 0.5)',@¦//           }}@¦//         >@¦//           <Box@¦//             className="get_width_from_this"@¦//             sx={{@¦//               // fontSize: '16px',@¦//               width: 'fit-content',@¦//               border: '2px solid rgba(255, 0, 0, 0.5)',@¦//@¦//               '@container ct_get_width_from_this (min-width: 500px)': {@¦//                 backgroundColor: 'rgba(255, 0, 255, 0.5)',@¦//               },@¦//             }}@¦//           >@¦//             01234567890123456789012345678901234567890123456789012345678901234567890123456789@¦//         </Box>@¦//         </Box>@¦//       </Box>@¦//     </Box>@¦
// ;waste time[container query cant get width for fitcontent; other css dk; just use js...];  // const RouterLinkStyled = (props: RouterLinkProps) => {@¦  const { children, ...props_exclude_children } = props;@¦@¦  // <Typography variant="inherit" noWrap sx={{ width: 'fit-content' }}>@¦  return (@¦    <Box@¦      sx={{@¦        containerType: 'inline-size',@¦      }}@¦    >@¦      <RouterLink@¦        // ref={ref}@¦        {...props_exclude_children}@¦        style={({ isActive }) => ({@¦          fontFamily: 'Roboto',@¦          color: 'inherit',@¦          textDecoration: 'inherit',@¦          fontWeight: isActive ? 700 : 'inherit',@¦          // display: 'inline-block',@¦        })}@¦      >@¦        {/* {children} */}@¦        <Box@¦          sx={{@¦            // '@container (width > 1em)': {@¦            //   fontSize: '2px',@¦            // },@¦            // fontSize: 'max(11px, 6cqi)',@¦            // fontSize: '5px',@¦            fontSize: '10cqw',@¦          }}@¦        >@¦          <>{children}</>@¦        </Box>@¦      </RouterLink>@¦    </Box>@¦  );@¦};
// ;waste time[container query cant // width: 'fit-content', // if parent is flex no need ...
// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] const BoxFitText: React.FC<{ children: React.ReactNode }> = ({ children }) => {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   const elt_parent_ref = React.useRef<HTMLElement>(null);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   const elt_child_ref = React.useRef<HTMLElement>(null);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] @¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   const [fontSize, setFontSize] = React.useState<number | undefined>(undefined);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   const [rerenderLoop_CheckWidthSmaller, set_rerenderLoop_CheckWidthSmaller] = React.useState<number>(0);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] @¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   React.useEffect(() => {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     // after mount cant be null@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     if (elt_parent_ref.current == null) throw new TypeError();@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     if (elt_child_ref.current == null) throw new TypeError();@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] @¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     const width_parent = elt_parent_ref.current.offsetWidth;@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     const width_child = elt_child_ref.current.offsetWidth;@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] @¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     console.log({ width_parent, width_child });@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     // const css_fontSize = elt_child_ref.current.style.fontSize;@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     // console.log(css_fontSize);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] @¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     if (width_child > width_parent) {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       setFontSize((fontSize_N) => {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         if (fontSize_N && fontSize_N < 1) throw new TypeError(); // @todo inf recursion@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         if (fontSize_N === undefined) {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]           return 32; // @todo@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         } else {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]           return fontSize_N * 0.8;@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         }@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       });@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       set_rerenderLoop_CheckWidthSmaller((n) => n + 1);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     }@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   }, [fontSize, elt_parent_ref.current]);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] @¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   // const resizeObserver = new ResizeObserver(() => {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //       // Do something when the width changes@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //       // This function will be called whenever the element's width changes@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //     });@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //     if (elementRef.current) {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //       resizeObserver.observe(elementRef.current);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //     }@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //     return () => {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //       if (elementRef.current) {@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //         resizeObserver.unobserve(elementRef.current);@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //       }@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   //     };@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] @¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   return (@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     <Box@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       sx={{@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         width: '100%',@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         border: '4px solid rgba(0, 255, 0, 0.5)',@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       }}@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       ref={elt_parent_ref}@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     >@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       <Box@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         sx={{@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]           width: 'fit-content',@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]           border: '2px solid rgba(255, 0, 0, 0.5)',@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]           fontSize: fontSize,@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         }}@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         ref={elt_child_ref}@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       >@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]         {children}@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]       </Box>@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]     </Box>@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing]   );@¦// ;[BoxFitText waste time, too many consider optimize thing & ref observer thing] };
// ;[just percentage doesnt guarantee the length is inside -- only make smaller (no better than cqw)]; ; import React from 'react';@¦import { TheaterComedy } from '@mui/icons-material';@¦import { Box } from '@mui/material';@¦import './index.css';@¦@¦function AppTest() {@¦  const [count, setCount] = React.useState(0);@¦@¦  return (@¦    //     <Box@¦    //       sx={{@¦    //         width: '200px',@¦    //         resize: 'both',@¦    //         overflow: 'scroll',@¦    //@¦    //         border: '2px solid rgba(0, 0, 255, 0.5)',@¦    //         padding: '2em',@¦    //       }}@¦    //     >@¦    //       <dib>01234567890123456789012345678901234567890123456789012345678901234567890123456789</dib>@¦    //     </Box>@¦    //     <Box@¦    //       sx={{@¦    //         // move to scss...@¦    //         ':root': {@¦    //           '--scaling-factor': 1,@¦    //         },@¦    //@¦    //         '.parent': {@¦    //           fontSize: 30,@¦    //           containerType: 'inline-size',@¦    //           resize: 'both',@¦    //           overflow: 'scroll',@¦    //           position: 'relative',@¦    //           width: '800px',@¦    //         },@¦    //@¦    //         '.largest': {@¦    //           fontSize: 'clamp(60%, calc(var(--scaling-factor) * 100%), 100%)',@¦    //         },@¦    //@¦    //         '.middle': {@¦    //           fontSize: 'clamp(60%, calc(var(--scaling-factor) * 85%), 100%)',@¦    //         },@¦    //@¦    //         '.smallest': {@¦    //           fontSize: 'clamp(60%, calc(var(--scaling-factor) * 70%), 100%)',@¦    //         },@¦    //@¦    //         '@container (max-width: 1200px)': {@¦    //           ':root': {@¦    //             '--scaling-factor': 0.9,@¦    //           },@¦    //           '@container (max-width: 800px)': {@¦    //             ':root': {@¦    //               '--scaling-factor': 0.8,@¦    //             },@¦    //             '@container (max-width: 600px)': {@¦    //               ':root': {@¦    //                 '--scaling-factor': 0.5, // /* won't render this small b/c the floor of clamp() is 60% */',@¦    //               },@¦    //             },@¦    //           },@¦    //         },@¦    //       }}@¦    //     >@¦    <div className="parent">@¦      <div className="bigboss">@¦        <p className="largest">I am ( usually :) ) the largest paragraph!</p>@¦        <p className="middle">I am ( usually :) ) the second largest paragraph!</p>@¦        <p className="smallest">I am ( usually :) the smallest paragraph!</p>@¦      </div>@¦    </div>@¦  );@¦}@¦@¦export default AppTest;@¦@¦@¦.parent {@¦  font-size: 30px;@¦  container-type: inline-size;@¦  container-name: parent_ct;@¦  resize: both;@¦  overflow: scroll;@¦  position: relative;@¦  width: 800px;@¦}@¦@¦.bigboss {@¦  --scaling-factor: 1,@¦}@¦@¦.largest {@¦  font-size: clamp(60%, calc(var(--scaling-factor) * 100%), 100%);@¦}@¦@¦.middle {@¦  font-size: clamp(60%, calc(var(--scaling-factor) * 85%), 100%);@¦}@¦@¦.smallest {@¦  font-size: clamp(60%, calc(var(--scaling-factor) * 70%), 100%);@¦}@¦@¦@container parent_ct (max-width: 1200px) {@¦  .bigboss {@¦    --scaling-factor: 0.9;@¦  }@¦@¦  @container parent_ct (max-width: 800px) {@¦    .bigboss {@¦      --scaling-factor: 0.8;@¦    }@¦@¦    @container parent_ct (max-width: 600px) {@¦      .bigboss {@¦        --scaling-factor: 0.5; // won't render this small b/c the floor of clamp() is 60% @¦      }@¦    }@¦  }@¦}@¦@¦// @¦// :root {@¦//   --scaling-factor: 1@¦// }@¦// @¦// .parent {@¦//   font-size: 30px@¦// }@¦// @¦// .largest {@¦//   font-size: clamp(60%, calc(var(--scaling-factor) * 100%), 100%); @¦// }@¦// @¦// .middle {@¦//   font-size: clamp(60%, calc(var(--scaling-factor) * 85%), 100%); @¦// }@¦// @¦// .smallest {@¦//   font-size: clamp(60%, calc(var(--scaling-factor) * 70%), 100%); @¦// }@¦// @¦// @media (max-width: 1200px) {@¦//   :root {@¦//     --scaling-factor: 0.9@¦//   }@¦//   @media (max-width: 800px) {@¦//     :root {@¦//       --scaling-factor: 0.8@¦//     }@¦//     @media (max-width: 600px) {@¦//       :root {@¦//         --scaling-factor: 0.5 /* won't render this small b/c the floor of clamp() is 60% */@¦//       }@¦//     }@¦//   }@¦// }@¦@¦@¦@¦@¦
const RouterLinkStyled = (props: RouterLinkProps) => {
  // ;TP learn; const { children, ...props_exclude_children } = props;
  // ;TP learn; <>{children}</>
  return (
    <Typography noWrap>
      <RouterLink
        // ref={ref}
        {...props}
        style={({ isActive }) => ({
          fontFamily: 'Roboto',
          color: 'inherit',
          textDecoration: 'inherit',
          fontWeight: isActive ? 700 : 'inherit',
          // display: 'inline-block',
        })}
      />
    </Typography>
  );
};

// reactjs - Styling selected TreeItem inside a TreeView - Stack Overflow
// https://stackoverflow.com/questions/62641151/styling-selected-treeitem-inside-a-treeview
// aga thing those deprecated
// const useStyles = makeStyles({
// idk why must provide this then it works
const theme = createTheme({
  components: {
    // import must from @mui/system not @mui/material ... // that throws hover error
    // console.warn(
    //   `// Object literal may only specify known properties, and 'MuiTreeItem' does not exist in type 'Components<Omit<Theme, "components">>'.ts(2353)` +
    //     `\n// but it works... seems just Type error, dk how to cope mui/material with mui/x ...`
    // );
    // @ts-ignore
    MuiTreeItem: {
      styleOverrides: {
        root: {
          margin: '0.5em',
        },
      },
    },
  },
});

const drawerWidth = 240;

const NavigationPanel: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  let sn_nodeId = 0;
  const iid = () => (++sn_nodeId).toString();

  const jsx_List = (
    <ThemeProvider theme={theme}>
      <TreeView
        // aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/">Home</RouterLinkStyled>} />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/About">About</RouterLinkStyled>} />
        <Divider />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/WebrtcVideoCommunication">WebrtcVideoCommunication</RouterLinkStyled>} icon={<DuoIcon />} />
        <Divider />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/users">Users</RouterLinkStyled>}>
          <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/users/self">User_self</RouterLinkStyled>} />
          <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/users/1">User_1</RouterLinkStyled>} />
          <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/users/2">User_2</RouterLinkStyled>} />
        </TreeItem>
        <Divider />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/activities">Activities</RouterLinkStyled>} />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/activities/played">Played</RouterLinkStyled>} />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/activities/published">Published</RouterLinkStyled>} />
      </TreeView>
    </ThemeProvider>
  );

  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          // flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            // boxSizing: 'border-box',
            padding: '0.2em',
          },
        }}
        // // []
        // //   marginLeft: `-${drawerWidth}px`,
        // //   ...(open && {
        // //     marginLeft: 0,
        // // <>
        // // https://mui.com/material-ui/react-drawer/#persistent-drawer
        // //
        // // just ugly .
        // // mui way of open dont utilize flex? & add redundant code
        // variant="persistent"
        // open={open}
        variant="permanent" // this prevent open = false
        anchor="left"
        style={{ display: open ? undefined : 'none' }}
      >
        {jsx_List}
      </Drawer>
      <IconButton
        sx={{
          zIndex: 1205,
          position: 'fixed',
          bottom: '0',
        }}
        onClick={() => setOpen(!open)}
      >
        <ViewSidebar />
      </IconButton>
    </Box>
  );
};

// 1. use MaterialUi first; then check if Boostrap is better -- regarding learning res & performance & job & functionality
// 1. may fall back just css
// ~~~~//[[shup i no res to know which one is better , those ppl more use ... ;
// @todo not just jest test & xstate & group chat & other opt em
// aga custom feels break theme . but the thing now its about damn job & ye(... ; so and now just say get box styled

// toolbar seems just horizontal & still those static position auto dkdk layout .

const LoginPanel: React.FC = () => (
  // <div className={styles.css_borderSimple}>
  <Box>
    <LoginButton />
    <LogoutButton />
    <UserProfileSimple />
  </Box>
);

export default function App() {
  // think, doesnt work
  // const jsx_App_WebrtcVideoCommunication_connectToServer = <App_WebrtcVideoCommunication_connectToServer />;

  let jsx_MenuButton: JSX.Element;
  {
    // javascript - How to pass props to {this.props.children} - Stack Overflow
    // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    // hacky

    const [open, setOpen] = React.useState(false);

    const handleClick = () => setOpen(true);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };

    const action = (
      <IconButton color="inherit" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    );

    jsx_MenuButton = (
      <>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Snackbar open={open} action={action} autoHideDuration={6000} onClose={handleClose} message="TLightChat version: unknow" />
      </>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavigationPanel />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {/* <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}> */}
          <AppBar sx={{ backgroundColor: 'rgb(40,0,86,0.9)' }} position="static">
            <Toolbar>
              {jsx_MenuButton}
              <Typography variant="h1">TLightChat</Typography>
              <span style={{ flexGrow: 5 }} />
              <LoginPanel />
            </Toolbar>
          </AppBar>
          <Box sx={{ margin: '0.4rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/WebrtcVideoCommunication" element={<App_WebrtcVideoCommunication_connectToServer />} />
              <Route path="/users" element={<div>users</div>} />
              <Route path="/users/self" element={<UserProfileSelf />} />
              <Route path="/users/:userId" element={<UserProfileOthers />} />
              <Route path="/activities">
                <Route index element={<div>Activities</div>} />
                <Route path="played" element={<div>Activity Played</div>} />
                <Route path="published" element={<div>Activity Published</div>} />
              </Route>
              <Route path="/n" element={<div>Not Found</div>} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  );
}
