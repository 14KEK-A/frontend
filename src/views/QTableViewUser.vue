<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";
  import { storeToRefs } from "pinia";
  import router from "@src/router";
  import { watch, onMounted, ref } from "vue";

  const usersStore = useUsersStore();

  const { isLoading, users, pagination, selected } = storeToRefs(usersStore);
  const showEditDialog = ref(false);

  watch(isLoading, () => {
    usersStore.getAll();
  });

  function deleteRecord(): void {
    usersStore.deleteById();
  }

  function newRecord(): void {
    usersStore.user = {};
    router.push("/newuser");
  }

  function editRecord(): void {
    usersStore.user = selected.value[0];
    usersStore.getById();
    router.push("/edituser");
  }

  function clearSelection(): void {
    selected.value = [];
  }
  function Submit() {
    usersStore.editById();
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

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "email", label: "email", field: "email", align: "left", sortable: true },
    { name: "user_name", label: "user_name", field: "user_name", align: "left", sortable: true },
    { name: "role_name", label: "role_name", field: "role_name", align: "left", sortable: true },
  ];
  function onRequest(props: any) {
    const { page, rowsPerPage, sortBy, descending, filter } = props.pagination;
    usersStore.fetchPaginatedusers({
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
    usersStore.getAll();
  });
</script>

<template>
  <q-page style="margin-top: 64px">
    <div class="q-pa-md">
      <q-table
        v-model:pagination="pagination"
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        :filter="pagination.filter"
        row-key="_id"
        :rows="users"
        selection="multiple"
        title="user"
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
    <q-dialog v-model="showEditDialog" persistent>
      <q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
        <q-form class="q-mx-md" @reset="Reset()" @submit="Submit">
          <div class="row">
            <div v-if="usersStore.user" class="col-12 q-gutter-md">
              <h4 class="text-center q-mt-lg q-mb-none">Edit document</h4>
              <q-input v-model="usersStore.user._id" label="id...:" outlined rounded type="text" />
              <q-input
                v-model="usersStore.user.user_name"
                label="Name:"
                outlined
                rounded
                type="text"
              />
              <q-input
                v-model="usersStore.user.role_name"
                label="Price:"
                outlined
                rounded
                type="number"
              />
              <q-input
                v-model="usersStore.user.email"
                label="Email:"
                outlined
                rounded
                type="text"
              />
              <div class="row justify-center">
                <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
                <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
              </div>

              <!-- p>Actual: {{ usersStore.user }}</p> -->

              <!-- <p>Old: {{ usersStore.productOld }}</p> -->

              <!-- <p>Selected: {{ usersStore.selected }}</p> -->
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped></style>
