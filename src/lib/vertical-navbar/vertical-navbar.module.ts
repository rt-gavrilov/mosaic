import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { A11yModule } from '@ptsecurity/cdk/a11y';
import { PlatformModule } from '@ptsecurity/cdk/platform';
import { McIconModule } from '@ptsecurity/mosaic/icon';

import {
    McVerticalNavbarItem,
    McVerticalNavbarItemBadge,
    McVerticalNavbarItemIcon
} from './vertical-navbar-item.component';
import {
    McVerticalNavbar,
    McVerticalNavbarBrand,
    McVerticalNavbarContainer,
    McVerticalNavbarLogo,
    McVerticalNavbarTitle
} from './vertical-navbar.component';


@NgModule({
    imports: [
        CommonModule,
        A11yModule,
        PlatformModule,
        McIconModule
    ],
    exports: [
        McVerticalNavbar,
        McVerticalNavbarContainer,
        McVerticalNavbarTitle,
        McVerticalNavbarItem,
        McVerticalNavbarItemIcon,
        McVerticalNavbarItemBadge,
        McVerticalNavbarBrand,
        McVerticalNavbarLogo
    ],
    declarations: [
        McVerticalNavbar,
        McVerticalNavbarContainer,
        McVerticalNavbarTitle,
        McVerticalNavbarItem,
        McVerticalNavbarItemIcon,
        McVerticalNavbarItemBadge,
        McVerticalNavbarBrand,
        McVerticalNavbarLogo
    ]
})
export class McVerticalNavbarModule {}