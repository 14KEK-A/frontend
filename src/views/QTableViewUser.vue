<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";
  import { storeToRefs } from "pinia";
  import router from "src/router";
  import { watch, onMounted } from "vue";

  const usersStore = useUsersStore();

  const { isLoading, users, selected } = storeToRefs(usersStore);

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

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "email", label: "email", field: "email", align: "left", sortable: true },
    { name: "user_name", label: "user_name", field: "user_name", align: "left", sortable: true },
    { name: "role_name", label: "role_name", field: "role_name", align: "left", sortable: true },
  ];

  onMounted(() => {
    usersStore.getAll();
  });
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        row-key="_id"
        :rows="users"
        selection="multiple"
        title="user"
        wrap-cells
      ></q-table>
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
  </q-page>
</template>

<style scoped></style>
