# cti-stix-diamond-activity-attack-graph

This is an Open Source Tool for visualizing [STIX](https://oasis-open.github.io/cti-documentation/stix/intro.html)
2.1 content in an Attack and Activity Thread Graph by using the
[Diamond Model of Intrusion Analysis](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf)
methodology and attack phases from [MITRE ATT&CK v8.2](https://attack.mitre.org/).

The Tool is implemented in the [HTML 5 Boilerplate](https://html5boilerplate.com/) framework. The complete visualization is build with
[d3.js](https://d3js.org/) a Javascript library for document manipulation.

## Usage

STIX objects can be easily visualized by providing a STIX 2.1 Bundle. The bundle needs to have a structured schema with
several Grouping SDOs each with one Attack Pattern SDO inside.

`{"id": "bundle--70d2c497-5717-5a3a-8b03-d2c1f74df433",
"objects": [
{
"id": "attack-pattern--b99dc28b-b1bc-41f1-b707-b1b50a2118ea",
"name": "Spearphishing Attachment",
"type": "attack-pattern",
"created": "2020-03-02T19:05:18.137Z",
"revoked": false,
"modified": "2020-10-18T01:52:25.316Z",
"x_grouping": "grouping--b5262315-c9a5-4903-a6f5-897d846a643d",
"x_sequence": 1,
"description": "Adversaries may send spearphishing emails with a malicious attachment in an attempt to gain access to victim systems. Spearphishing attachment is a specific variant of spearphishing. Spearphishing attachment is different from other forms of spearphishing in that it employs the use of malware attached to an email. All forms of spearphishing are electronically delivered social engineering targeted at a specific individual, company, or industry. In this scenario, adversaries attach a file to the spearphishing email and usually rely upon [User Execution](https://attack.mitre.org/techniques/T1204) to gain execution.\n\nThere are many options for the attachment such as Microsoft Office documents, executables, PDFs, or archived files. Upon opening the attachment (and potentially clicking past protections), the adversary's payload exploits a vulnerability or directly executes on the user's system. The text of the spearphishing email usually tries to give a plausible reason why the file should be opened, and may explain how to bypass system protections in order to do so. The email may also contain instructions on how to decrypt an attachment, such as a zip file password, in order to evade email boundary defenses. Adversaries frequently manipulate file extensions and icons in order to make attached executables appear to be document files, or files exploiting one application appear to be a file for a different one.",
"spec_version": "2.1",
"kill_chain_phases": [
{
"phase_name": "initial-access",
"kill_chain_name": "mitre-attack"
}
],
"external_references": [
{
"external_id": "T1566.001",
"source_name": "mitre-attack"
}
]
},
{
"id": "grouping--b5df7982-fb4f-4f73-aac8-c8e22dd8f76d",
"x_master_event": false,
"x_attack_pattern_name": "System Network Configuration Discovery",
"x_phase_name": "discovery",
"context": "Test",
"object_refs": [
"attack-pattern--b5d88165-5de1-4b36-94b3-a7b272256088",
"malware--beab30f1-4219-4efb-a533-0ae1a2aa1c6b",
"malware--7c2414ab-19fd-4d2e-b25b-6337f928b8ed",
"malware--fbb98e10-5b22-4bc6-8698-c0da77582f1e",
"malware--4082b337-fd97-427b-a559-8490cdb9b659",
"tool--736dcf51-f123-434b-9a34-08208e856c94",
"tool--5fd5f0a1-9191-45e3-9223-a58a3709eeb6",
"tool--09e8ebb0-164d-4dd0-bb9f-2908007be068",
"tool--81d535d5-dbd1-4f85-9da2-107878c85203",
"tool--f000aee2-7a57-4573-9a96-ce5f7c3bdeac",
"threat-actor--8f82ccac-ff89-4307-9661-547aaa4eaa77",
"infrastructure--dc7e9a67-4667-4c75-b5d0-776b54c54ced",
"threat-actor--5967a88b-f584-4694-881d-da142fe8cba9",
"campaign--5b1e8939-b483-4365-82f4-67227e120279",
"location--cfed3c9c-2849-4c4e-a8ba-deae762073cf",
"relationship--41d286ca-fabe-4a8a-bf51-500bf6787a5e",
"relationship--2fa03db6-3e62-4b63-8a6f-d094c24234c0",
"relationship--f5797558-24a2-4dc1-ad24-1a0d2ffbed08",
"relationship--53a117fb-519a-4ef6-bd74-60bccd5dae14",
"relationship--72f5f3bf-914c-486e-96f5-221481095ba0",
"relationship--8271fd7e-e52c-409f-84c3-635c742cf01f",
"relationship--b13d6363-df76-4d04-bc45-a89462426c38",
"relationship--3c9267e5-06cb-4496-8113-f1917f22b617",
"relationship--0438695e-d150-4567-99a6-6bcd52025589",
"relationship--63b2136a-4370-40a0-8f63-e2e025a8764d",
"network-traffic--ccb9600e-280d-531e-8dea-c11c527338a1",
"relationship--edac3550-ab65-483d-89da-67bcde0988be",
"relationship--038205b6-7a90-4c90-bf35-3ef283eb2a9b",
"relationship--b320b3a1-814b-4d9c-90e0-f16e2706e1b7",
"relationship--ec35779f-dc5a-44fe-afc2-d16a7d734c55",
"relationship--01bf18bd-ff7b-4db8-abb9-060667f141af",
"relationship--986a67d4-8c99-4f00-9faa-38bf21362895",
"relationship--7efe843c-707e-40e1-818a-c77892e51f37",
"relationship--950356ef-9389-4882-9f60-5f0309519885",
"file--e1ced819-4be2-5852-a819-b59051808605",
"file--d3d2bfcf-899c-5b98-9c81-b2b3e1c841ec",
"file--37cc3b17-3619-5296-bd62-aa6edb5974b2",
"file--4672da5d-49b1-54b3-863f-06c832e017ae",
"file--d7ed8435-e427-53d3-8e5c-4571deaa246e",
"autonomous-system--e1387e17-7b63-5f19-a3e8-dc7329ee9e4e",
"domain-name--fbb2ede6-4896-5322-a1ed-6246aa858a24",
"url--11230dad-ef2d-5618-b317-c563a8d923b2",
"ipv4-addr--4b90c26b-ee85-5c77-a23b-6d3a15890673",
"url--a3620d5e-e9db-5292-9ec3-f38cee2e12b8",
"relationship--c9d7bffe-5fac-47de-ab70-6b5b1c9d480d",
"relationship--b230836a-2756-4a62-ae72-99ee95b3cfd6",
"relationship--9ed27bbb-7f52-4731-a9f5-f8b63cc2bcce",
"relationship--8ea4fff8-21c2-4999-9dc9-d7cfcb886c1f",
"relationship--42fb48ce-0dce-47d8-a423-5a26158aa613",
"relationship--30831a23-cbe6-4e32-8a4e-21a5e20d7946",
"relationship--6eda5f52-ef63-4d1d-a516-842766029c5f",
"relationship--ca2cdedc-ec93-430c-b542-b5e35894e1e4",
"relationship--3ebf093e-d023-4aa4-86cf-cef86165db63",
"relationship--e9966e1b-1574-474b-a2b4-cfe0ccac1cc2",
"relationship--74654ae6-42b9-48cb-b6c1-390b6f844acf",
"relationship--f77b1aa3-10a3-488f-b85b-03d2d989b8c7",
"relationship--234cbc5b-cb37-4fab-b013-bfa686705b58"
],
"type": "grouping",
"spec_version": "2.1",
"created": "2021-04-18T06:18:03.030108Z",
"modified": "2021-04-18T06:18:03.030108Z",
"revoked": false
},
]`









## LICENSE

Copyright (c) 2021 Yusuf Khan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the cti-stix-diamond-activity-attack-graph
project watermark that links back to https://github.com/yukh1402/cti-stix-diamond-activity-attack-graph
as part of rendered diagrams MUST NOT be removed or changed. When this software is being used
in a website or application,the watermark must stay fully visible and not visually overlapped
by other elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
