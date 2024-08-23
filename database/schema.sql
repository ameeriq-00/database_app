-- Create Persons Table
CREATE TABLE Persons (
    PersonID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    PhoneNumber TEXT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create a_temp Table with ON DELETE CASCADE
CREATE TABLE a_temp (
    LogID INTEGER PRIMARY KEY AUTOINCREMENT,
    PersonID INTEGER,
    E_REPORT TEXT,
    CALLER_NUMBER TEXT,
    CALLED_NUMBER TEXT,
    THIRD_PARTY_NUMBER TEXT,
    CALL_INITIAL_TIME DATETIME,
    CONVERSATION_DURATION INTEGER,
    CITY TEXT,
    SITE_NAME TEXT,
    CHARGED_MOBILE_USER_IMEI TEXT,
    CHARGED_MOBILE_USER_IMSI TEXT,
    LON REAL,
    LAT REAL,
    SITE_ID TEXT,
    CGI TEXT,
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID) ON DELETE CASCADE
);

-- Create z_temp Table with ON DELETE CASCADE
CREATE TABLE z_temp (
    LogID INTEGER PRIMARY KEY AUTOINCREMENT,
    PersonID INTEGER,
    Date DATETIME,
    CALL_TYPE TEXT,
    Duration INTEGER,
    CallingNumber TEXT,
    CalledNumber TEXT,
    CallLocation TEXT,
    SiteID TEXT,
    Split TEXT,
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID) ON DELETE CASCADE
);

-- Create k_temp Table with ON DELETE CASCADE
CREATE TABLE k_temp (
    LogID INTEGER PRIMARY KEY AUTOINCREMENT,
    PersonID INTEGER,
    DATETIME DATETIME,
    CALL_TYPE TEXT,
    MSISDN TEXT,
    IMSI TEXT,
    B_PARTY_MSISDN TEXT,
    DURATION INTEGER,
    CALLINGNUMBER TEXT,
    CALLEDNUMBER TEXT,
    IMEI TEXT,
    CALLLOCATION TEXT,
    SITE_ID TEXT,
    SITE TEXT,
    GOVERNORATE TEXT,
    LONGITUDE REAL,
    LATITUDE REAL,
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID) ON DELETE CASCADE
);

-- Create Archive Table
CREATE TABLE Archive (
    T INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_number TEXT,
    name_info TEXT,
    bookid TEXT,
    app_book_date DATETIME,
    recived_from TEXT,
    accused_char TEXT,
    app_form TEXT,
    app_date DATETIME,
    period_fromto TEXT,
    tech_name TEXT,
    app_kind TEXT
);

-- Create Dispatch Table
CREATE TABLE Dispatch (
    T INTEGER PRIMARY KEY AUTOINCREMENT,
    Name_accused TEXT,
    saved_numbers TEXT,
    saved_name TEXT,
    saved_info TEXT,
    city TEXT
);
