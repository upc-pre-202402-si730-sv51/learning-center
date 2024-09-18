<script>
import {Category} from "../model/category.entity.js";
import {CategoryService} from "../services/category.service.js";

export default {
  name: "category-management",
  data() {
    return {
      title: { singular: 'Category', plural: 'Categories' },
      categories: [],
      category: new Category({}),
      selectedCategories: [],
      categoryService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },
  methods: {

    //#region Utility Methods
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },
    findIndexById(id) {
      return this.categories.findIndex(category => category.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.category = new Category({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItem(item) {
      this.category = new Category(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.category = new Category(item);
      this.deleteCategory();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedCategories = selectedItems;
      this.deleteSelectedCategories();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (this.category.name.trim()) {
        if (item.id) {
          this.updateCategory();
        } else {
          this.createCategory();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    //#endregion

    //#region Action Methods
    createCategory() {
      this.categoryService.create(this.category).then(response => {
        let category = new Category(response.data);
        this.categories.push(category);
        this.notifySuccessfulAction('Category Created');
      }).catch(error => console.error(error));
    },
    updateCategory() {
      this.categoryService.update(this.category.id, this.category).then(response => {
        let index = this.findIndexById(this.category.id);
        this.categories[index] = new Category(response.data);
        this.notifySuccessfulAction('Category Updated');
      }).catch(error => console.error(error));
    },
    deleteCategory() {
      this.categoryService.delete(this.category.id).then(() => {
        let index = this.findIndexById(this.category.id);
        this.categories.splice(index, 1);
        this.notifySuccessfulAction('Category Deleted');
      }).catch(error => console.error(error));
    },
    deleteSelectedCategories() {
      this.selectedCategories.forEach((category) => {
        this.categoryService.delete(category.id).then(() => {
          this.categories = this.categories.filter((t) => t.id !== category.id);
        });
      });
      this.notifySuccessfulAction('Categories Deleted');
    },
    //#endregion

    //#region Lifecycle Hooks
    created() {
      this.categoryService = new CategoryService();
      this.categoryService.getAll().then(response => {
        this.categories = response.map(category => new Category(category));
        console.log(this.categories);
      }).catch(error => console.error(error));
    }

    //#endregion
  }
}
</script>

<template>

</template>

<style scoped>

</style>