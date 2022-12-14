<script setup lang="ts">
  import { useOrderStore } from "../store/orderStore";
  import { storeToRefs } from "pinia";
  import router from "src/router";
  import { useUsersStore } from "../store/usersStore";
  import { onMounted, ref, watch } from "vue";

  const orderStore = useOrderStore();
  const usersStore = useUsersStore();

  const { isLoading, dataN, pagination, selected } = storeToRefs(orderStore);

  const showEditDialog = ref(false);

  watch(isLoading, () => {
    orderStore.getAll();
  });

  function deleteRecord(): void {
    orderStore.deleteById();
  }

  function newRecord(): void {
    orderStore.data = {};
    router.push("/neworder");
  }

  function editRecord(): void {
    orderStore.data = selected.value[0];
    orderStore.getById();
    router.push("/editorder");
    showEditDialog.value = true;
  }

  function clearSelection(): void {
    selected.value = [];
  }

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "ship_date", label: "ship_date", field: "ship_date", align: "left", sortable: true },
    { name: "order_date", label: "order_date", field: "order_date", align: "left", sortable: true },
    { name: "orders_id", label: "orders_id", field: "orders_id", align: "left", sortable: true },
  ];

  function onRequest(props: any) {
    const { page, rowsPerPage, sortBy, descending, filter } = props.pagination;
    orderStore.fetchPaginatedOrders({
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
    orderStore.getAll();
  });

  function Submit() {
    orderStore.editById();
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
    orderStore.getAll();
  }
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
        :rows="dataN"
        selection="multiple"
        title="Orders"
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
            <div v-if="orderStore.data" class="col-12 q-gutter-md">
              <h4 class="text-center q-mt-lg q-mb-none">Edit document</h4>
              <!-- <q-select
                v-model="orderStore.data.adosav"
                clearable
                emit-value
                filled
                label="Ad??s??v:"
                map-options
                option-label="sav"
                option-value="_id"
                :options="adosavokStore.dataN.sort((a, b) => a.sav!.localeCompare(b.sav!))"
              /> -->
              <q-input v-model="orderStore.data._id" filled label="id:" type="text" />
              <q-date
                v-model="orderStore.data.order_date"
                filled
                label="Rendel??s D??tuma:"
                type="date"
              />
              <q-date
                v-model="orderStore.data.ship_date"
                filled
                label="Sz??ll??t??s d??tuma:"
                type="date"
              />
              <q-input v-model="orderStore.data.Orders_id" filled label="id_order:" type="number" />
              <div class="row justify-center">
                <q-btn class="q-mr-md" color="green" label="Ment??s" no-caps type="submit" />
                <q-btn class="q-mr-md" color="red" label="M??gsem" no-caps type="reset" />
              </div>
              <!-- <p>Actual: {{ orderStore.data }}</p> -->
              <!-- <p>Old: {{ orderStore.dataOld }}</p> -->
              <!-- <p>Selected: {{ orderStore.selected }}</p> -->
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<!-- <template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        row-key="_id"
        :rows="dataN"
        selection="multiple"
        title="Orders"
        wrap-cells
      ></q-table>
      -- Buttons:-------------
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
      !-- <p>Pagination object: {{ pagination }}</p> --
      !-- <p>Selected array: {{ selected }}</p> --
      !-- <div>Filter: "{{ pagination.filter }}"</div> --
    </div>
  </q-page>
</template> -->

<style scoped></style>
