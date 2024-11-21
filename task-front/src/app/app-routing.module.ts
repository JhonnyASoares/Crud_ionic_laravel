import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreatePage } from './page/create/create.page';
import { ListPage } from './page/list/list.page';
import { SelectPage } from './page/select/select.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  },

  {
    path: 'create',
    children: [
      {
        path: '',
        component: CreatePage
      }
    ]
  },
  {
    path: 'list',
    children: [
      { path: '',
        component: ListPage
      }
    ]
  },
  {
    path: 'select/:id',
    children: [
      { path: '',
        component: SelectPage
      }
    ]  
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
