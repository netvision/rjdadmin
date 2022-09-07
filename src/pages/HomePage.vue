<template>
  <q-page>
    <div class="flex flex-center q-pa-md">
      <q-select
        filled
        label="Select village"
        v-model="village"
        :options="villageOptions"
        option-value="id"
        option-label="name"
        use-input
        @filter="filterFn"
        @update:model-value="getRecords"
        option-disable="inactive"
        style="min-width: 250px; max-width: 300px"
      />
    </div>
    <div class="row q-gutter-xl">
      <div class="col-4">
        <q-list v-if="activities" class="q-pa-md">
          <q-item
            clickable
            v-ripple
            v-for="act in activities"
            :key="act.id"
            @click="getActRec(act)"
          >
            <q-item-section>{{ act.title }} </q-item-section
            ><q-badge color="green" align="top">{{ act.total }}</q-badge>
          </q-item>
        </q-list>
      </div>
      <div class="col">
        <h5 class="text-h5 q-py-xs" v-if="village">
          {{ village.name }}
        </h5>
        <h6 class="text-h6 q-py-xs" v-if="activity.title">
          {{ activity.title
          }}<span class="q-px-md"
            ><q-btn flat @click="addRecord()" icon="add"></q-btn
          ></span>
        </h6>
        <div v-if="activity.title">
          <div v-if="actRec.length > 0" class="q-pa-md">
            <q-list>
              <q-item
                clickable
                v-for="(rec, i) in actRec"
                :key="i"
                @click="openRecModal(rec)"
              >
                {{ i + 1 }}.{{ rec.location }}
              </q-item>
            </q-list>
          </div>
          <div v-else>
            <p>
              No Records found! <br />
              <q-btn flat @click="addRecord()">Add new!</q-btn>
            </p>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="recModal">
      <q-card class="q-pa-md" style="width: 60%">
        <h6 class="text-h6">
          <span v-if="theRecord.id">Edit</span><span v-else>Add</span> Record
        </h6>
        <q-input type="text" label="location" v-model="theRecord.location" />
        <q-input
          v-for="(d, i) in theRecord.jsonData"
          :key="i"
          type="text"
          :label="d.k"
          v-model="d.v"
        />
        <q-card-actions>
          <q-btn flat color="dark" label="close" @click="closeRecModal()" />
          <q-btn flat color="primary" label="save" @click="saveRec()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../boot/axios";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const villages = ref([]);
const village = ref();
const villageOptions = ref([]);
const actRecords = ref([]);
const activities = ref([]);
const activity = ref({});
const actRec = ref([]);
const theRecord = ref({});
const recModal = ref(false);

const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      villageOptions.value = villages.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    villageOptions.value = villages.value.filter(
      (v) => v.name.toLowerCase().indexOf(needle) > -1
    );
  });
};

const getRecords = async (v) => {
  actRec.value = [];
  activity.value = {};
  actRecords.value = await api
    .get("activity-record?village_id=" + v.id + "&expand=activity")
    .then((r) => r.data);
  activities.value = await api.get("/activity").then((r) => r.data);
  activities.value.forEach((act) => {
    let c = actRecords.value.filter((r) => r.activity_id === act.id).length;
    act.total = c;
  });
  //console.log(actRecords.value.length);
};

const getActRec = (act) => {
  activity.value = act;
  actRec.value = actRecords.value.filter((r) => r.activity_id === act.id);
};

const openRecModal = (rec) => {
  theRecord.value = rec;
  theRecord.value.jsonData = JSON.parse(theRecord.value.other_data);
  recModal.value = true;
  console.log(rec);
};

const closeRecModal = () => {
  theRecord.value = {};
  recModal.value = false;
};

const addRecord = () => {
  if (activity.value.id && village.value.id) {
    let jsonData = [];
    if (activity.value.id === 1) {
      jsonData = [
        { k: "Tank No.", v: "" },
        { k: "Size", v: "" },
        { k: "Beneficiary", v: "" },
        { k: "Total No. of beneficiaries", v: "" },
        { k: "Altitude", v: "" },
      ];
    } else if (activity.value.id === 2) {
      jsonData = [
        { k: "Depth of Well", v: "" },
        { k: "Status", v: "" },
        { k: "Depth of Bore", v: "" },
        { k: "Connected Water Tanks", v: "" },
        { k: "Roof Area", v: "" },
        { k: "Connected Households", v: "" },
        { k: "Water Available for Recharge", v: "" },
      ];
    } else if (activity.value.id === 3) {
      jsonData = [{ k: "Status", v: "" }];
    } else if (activity.value.id === 6 || activity.value.id === 7) {
      jsonData = [
        { k: "Serial No.", v: "" },
        { k: "Date", v: "" },
        { k: "Beneficiary", v: "" },
      ];
    } else {
      jsonData = [];
    }

    theRecord.value = {
      location: "",
      village_id: village.value.id,
      activity_id: activity.value.id,
      jsonData: jsonData,
    };
    recModal.value = true;
  } else {
    $q.notify("Please Select village and Activity first!");
  }
};

const saveRec = async () => {
  theRecord.value.other_data = JSON.stringify(theRecord.value.jsonData);
  delete theRecord.value.jsonData;
  delete theRecord.value.activity;
  console.log(theRecord.value);

  if (theRecord.value.id) {
    delete theRecord.value.village_id;
    delete theRecord.value.activity_id;
    try {
      await api.put("activity-records/" + theRecord.value.id, theRecord.value);
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      theRecord.value.lat = "0.000000";
      theRecord.value.lon = "0.000000";
      let res = await api
        .post("activity-records", theRecord.value)
        .then((r) => r.data);
      actRec.value.push(res);
    } catch (e) {
      console.log(e);
    }
  }
  //json stringify jsondata to other_data and then save record via api
  theRecord.value = {};
  recModal.value = false;
};

onMounted(async () => {
  villages.value = await api.get("/villages?sort=name").then((r) => r.data);
  villageOptions.value = villages.value;
});
</script>
