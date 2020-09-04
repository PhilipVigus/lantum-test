import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {
    id: "1234",
    firstName: "John",
    lastName: "Doe",
    staffType: "gp",
    staffTypeId: "1"
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
});
export default userSlice.reducer;
