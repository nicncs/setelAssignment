import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'orders', pathMatch: 'prefix' },
            // {
            //     path: 'dashboard',
            //     loadChildren: () =>
            //         import('./dashboard/dashboard.module').then(
            //             m => m.DashboardModule
            //         )
            // },
            // {
            //     path: 'charts',
            //     loadChildren: () =>
            //         import('./charts/charts.module').then(m => m.ChartsModule)
            // },
            {
                path: 'orders',
                loadChildren: () =>
                    import('./orders/orders.module').then(m => m.OrdersModule)
            },
            {
                path: 'services',
                loadChildren: () =>
                    import('./services/services.module').then(
                        m => m.ServicesModule
                    )
            }
            // {
            //     path: 'forms',
            //     loadChildren: () =>
            //         import('./form/form.module').then(m => m.FormModule)
            // },
            // {
            //     path: 'bs-element',
            //     loadChildren: () =>
            //         import('./bs-element/bs-element.module').then(
            //             m => m.BsElementModule
            //         )
            // },
            // {
            //     path: 'grid',
            //     loadChildren: () =>
            //         import('./grid/grid.module').then(m => m.GridModule)
            // },
            // {
            //     path: 'components',
            //     loadChildren: () =>
            //         import('./bs-component/bs-component.module').then(
            //             m => m.BsComponentModule
            //         )
            // },
            // {
            //     path: 'blank-page',
            //     loadChildren: () =>
            //         import('./blank-page/blank-page.module').then(
            //             m => m.BlankPageModule
            //         )
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
