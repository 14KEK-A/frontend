<script setup lang="ts">
  import { useProductStore } from "../store/productStore";
  import { storeToRefs } from "pinia";
  import router from "src/router";
  import { useUsersStore } from "../store/usersStore";

  const productStore = useProductStore();
  const usersStore = useUsersStore();

  const { isLoading, products, pagination, selected } = storeToRefs(productStore);

  const showEditDialog = ref(false);

  watch(isLoading, () => {
    productStore.getAll();
  });

  function deleteRecord(): void {
    productStore.deleteById();
  }

  function newRecord(): void {
    productStore.product = {};
    router.push("/newproduct");
  }

  function editRecord(): void {
    productStore.product = selected.value[0];
    productStore.getById();
    router.push("/editproduct");
  }

  function clearSelection(): void {
    selected.value = [];
  }
  function Submit() {
    productStore.editById();
  }
  function filterChanged(): void {
    selected.value = [];
  }
  function Reset() {
    onRequest({
      pagination: pagination.value,
    });
    showEditDialog.value = false;
  }
  function BeforeShowDialog() {
    productStore.getAll();
  }

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "name", label: "name", field: "name", align: "left", sortable: true },
    { name: "price", label: "price", field: "price", align: "left", sortable: true },
    { name: "type", label: "type", field: "type", align: "left", sortable: true },
    {
      name: "description",
      label: "description",
      field: "description",
      align: "left",
      sortable: true,
    },
  ];
  function onRequest(props: any) {
    const { page, rowsPerPage, sortBy, descending, filter } = props.pagination;
    productStore.fetchPaginatedProducts({
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      order: sortBy,
      sort: descending ? "-1" : "1",
      keyword: filter,
    });
    // don't forget to update local pagination object
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
  }

  onMounted(() => {
    productStore.getAll();
  });
</script>
<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-model:pagination="pagination"
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        :filter="pagination.filter"
        row-key="_id"
        :rows="products"
        selection="multiple"
        title="Products"
        wrap-cells
        @request="onRequest"
      >
        <template #top-right>
          <q-input
            v-model="pagination.filter"
            debounce="300"
            dense
            placeholder="Search"
            @update:model-value="filterChanged()"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
      <!-- Buttons:  -->
      <div class="row justify-center q-ma-sm q-gutter-sm">
        <q-btn v-show="selected.length != 0" color="orange" no-caps @click="clearSelection">
          {{ selected.length > 1 ? "Clear selections" : "Clear selection" }}
        </q-btn>
        <q-btn
          v-show="usersStore.loggedUser && selected.length == 0"
          color="green"
          no-caps
          @click="newRecord"
        >
          New record
        </q-btn>
        <q-btn v-show="selected.length == 1" color="blue" no-caps @click="editRecord">
          Edit record
        </q-btn>
        <q-btn v-show="selected.length != 0" color="red" no-caps @click="deleteRecord">
          {{ selected.length > 1 ? "Delete selected records" : "Delete selected record" }}
        </q-btn>
      </div>
      <!-- <p>Pagination object: {{ pagination }}</p> -->
      <!-- <p>Selected array: {{ selected }}</p> -->
      <!-- <div>Filter: "{{ pagination.filter }}"</div> -->
    </div>
    <q-dialog v-model="showEditDialog" persistent @before-show="BeforeShowDialog()">
      <q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
        <q-form class="q-mx-md" @reset="Reset()" @submit="Submit">
          <div class="row">
            <div v-if="productStore.product" class="col-12 q-gutter-md">
              <h4 class="text-center q-mt-lg q-mb-none">Edit document</h4>
              <!-- <q-select
              //   v-model="productStore.product.adosav"
              //   clearable
              //   emit-value
              //   filled
              //   label="Adósáv:"
              //   map-options
              //   option-label="sav"
              //   option-value="_id"
              //   :options="adosavokStore.products.sort((a, b) => a.sav!.localeCompare(b.sav!))"
              // /> -->
              <q-input v-model="productStore.product._id" filled label="id...:" type="text" />
              <q-input v-model="productStore.product.name" filled label="Név:" type="text" />
              <q-input v-model="productStore.product.price" filled label="Ár:" type="number" />
              <q-input v-model="productStore.product.type" filled label="Tipus:" type="text" />
              <q-input
                v-model="productStore.product.description"
                filled
                label="description:"
                type="text"
              />
              <div class="row justify-center">
                <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
                <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" />
              </div>

              <!-- p>Actual: {{ productStore.product }}</p> -->

              <!-- <p>Old: {{ productStore.productOld }}</p> -->

              <!-- <p>Selected: {{ productStore.selected }}</p> -->
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<!-- <template>
//   <q-page>
//     <div class="q-pa-md">
//       <q-table
//         v-model:selected="selected"
//         binary-state-sort
//         :columns="columns"
//         dense
//         row-key="_id"
//         :rows="products"
//         selection="multiple"
//         title="Product"
//         wrap-cells
//       ></q-table>
//       <-- Buttons:  --
//       <div class="row justify-center q-ma-sm q-gutter-sm">
//         <q-btn v-show="selected.length != 0" color="orange" no-caps @click="clearSelection">
//           {{ selected.length > 1 ? "Clear selections" : "Clear selection" }}
//         </q-btn>
//         <q-btn
//           v-show="usersStore.loggedUser && selected.length == 0"
//           color="green"
//           no-caps
//           @click="newRecord"
//         >
//           New record
//         </q-btn>
//         <q-btn v-show="selected.length == 1" color="blue" no-caps @click="editRecord">
//           Edit record
//         </q-btn>
//         <q-btn v-show="selected.length != 0" color="red" no-caps @click="deleteRecord">
//           {{ selected.length > 1 ? "Delete selected records" : "Delete selected record" }}
//         </q-btn>
//       </div>
//        <p>Pagination object: {{ pagination }}</p> --
//        <p>Selected array: {{ selected }}</p> -->

<!-- <div>Filter: "{{ pagination.filter }}"</div> --
//     </div>
//   </q-page>
// </template> -->

<style scoped></style>
